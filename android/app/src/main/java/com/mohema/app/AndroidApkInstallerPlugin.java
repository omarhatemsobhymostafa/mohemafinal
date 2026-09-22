package com.mohema.app;

import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.Settings;
import androidx.core.content.FileProvider;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@CapacitorPlugin(name = "AndroidApkInstaller")
public class AndroidApkInstallerPlugin extends Plugin {
    private final ExecutorService executor = Executors.newSingleThreadExecutor();
    private volatile boolean cancelled = false;
    private File downloadedApk;

    @PluginMethod
    public void downloadApk(PluginCall call) {
        String urlValue = call.getString("url", "");
        if (urlValue.isEmpty() || !isTrustedUrl(urlValue)) {
            call.reject("رابط APK غير متاح أو غير آمن.");
            return;
        }

        cancelled = false;
        executor.execute(() -> {
            HttpURLConnection connection = null;
            try {
                notifyState("downloading", "");
                URL url = URI.create(urlValue).toURL();
                connection = (HttpURLConnection) url.openConnection();
                connection.setConnectTimeout(15000);
                connection.setReadTimeout(30000);
                connection.setRequestProperty("Accept", "application/vnd.android.package-archive");
                connection.connect();
                if (connection.getResponseCode() < 200 || connection.getResponseCode() >= 300) {
                    throw new Exception("تعذر الوصول إلى ملف APK.");
                }

                File directory = new File(getContext().getExternalFilesDir(Environment.DIRECTORY_DOWNLOADS), "mohema");
                if (!directory.exists() && !directory.mkdirs()) throw new Exception("تعذر تجهيز مساحة التنزيل.");
                downloadedApk = new File(directory, "Mohema.apk");
                long total = connection.getContentLengthLong();
                long downloaded = 0;
                long startedAt = System.currentTimeMillis();

                try (BufferedInputStream input = new BufferedInputStream(connection.getInputStream()); FileOutputStream output = new FileOutputStream(downloadedApk)) {
                    byte[] buffer = new byte[8192];
                    int count;
                    while ((count = input.read(buffer)) != -1) {
                        if (cancelled) throw new InterruptedException();
                        output.write(buffer, 0, count);
                        downloaded += count;
                        long elapsed = Math.max(1, System.currentTimeMillis() - startedAt);
                        int percent = total > 0 ? (int) Math.min(100, downloaded * 100 / total) : 0;
                        JSObject progress = new JSObject();
                        progress.put("percent", percent);
                        progress.put("downloadedBytes", downloaded);
                        progress.put("totalBytes", total);
                        progress.put("speedBytesPerSecond", downloaded * 1000 / elapsed);
                        notifyListeners("downloadProgress", progress);
                    }
                }
                notifyState("preparing", "");
                call.resolve(new JSObject().put("started", true));
            } catch (InterruptedException error) {
                if (downloadedApk != null) downloadedApk.delete();
                call.reject("تم إلغاء التنزيل.");
            } catch (Exception error) {
                if (downloadedApk != null) downloadedApk.delete();
                notifyState("error", error.getMessage() == null ? "تعذر تنزيل التطبيق." : error.getMessage());
                call.reject(error.getMessage() == null ? "تعذر تنزيل التطبيق." : error.getMessage());
            } finally {
                if (connection != null) connection.disconnect();
            }
        });
    }

    @PluginMethod
    public void cancelDownload(PluginCall call) {
        cancelled = true;
        call.resolve();
    }

    @PluginMethod
    public void openInstaller(PluginCall call) {
        JSObject result = new JSObject();
        if (downloadedApk == null || !downloadedApk.exists()) {
            result.put("launched", false);
            call.resolve(result);
            return;
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O && !getContext().getPackageManager().canRequestPackageInstalls()) {
            Intent settingsIntent = new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES, Uri.parse("package:" + getContext().getPackageName()));
            getActivity().startActivity(settingsIntent);
            result.put("launched", false);
            result.put("requiresPermission", true);
            call.resolve(result);
            return;
        }

        Uri apkUri = FileProvider.getUriForFile(getContext(), getContext().getPackageName() + ".fileprovider", downloadedApk);
        Intent installerIntent = new Intent(Intent.ACTION_VIEW);
        installerIntent.setDataAndType(apkUri, "application/vnd.android.package-archive");
        installerIntent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_ACTIVITY_NEW_TASK);
        if (installerIntent.resolveActivity(getContext().getPackageManager()) == null) {
            result.put("launched", false);
            call.resolve(result);
            return;
        }
        getActivity().startActivity(installerIntent);
        result.put("launched", true);
        call.resolve(result);
    }

    private boolean isTrustedUrl(String value) {
        try {
            URI uri = URI.create(value);
            return "https".equalsIgnoreCase(uri.getScheme()) && uri.getHost() != null && !uri.getHost().isEmpty();
        } catch (IllegalArgumentException error) {
            return false;
        }
    }

    private void notifyState(String state, String message) {
        JSObject event = new JSObject();
        event.put("state", state);
        event.put("message", message);
        notifyListeners("downloadState", event);
    }
}