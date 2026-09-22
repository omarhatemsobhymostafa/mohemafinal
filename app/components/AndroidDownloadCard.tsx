"use client";

import { Capacitor } from "@capacitor/core";
import { useState } from "react";
import { ANDROID_APK_URL } from "../lib/android-apk";

type DownloadState = "idle" | "downloading" | "preparing" | "complete" | "error";

type DownloadProgress = {
  percent: number;
  downloadedBytes: number;
  totalBytes: number;
  speedBytesPerSecond: number;
};

type AndroidApkInstaller = {
  downloadApk(options: { url: string }): Promise<{ started: boolean }>;
  cancelDownload(): Promise<void>;
  openInstaller(): Promise<{ launched: boolean; requiresPermission?: boolean }>;
  addListener(
    eventName: "downloadProgress" | "downloadState",
    listener: (event: DownloadProgress | { state: string; message?: string }) => void,
  ): Promise<{ remove: () => Promise<void> }>;
};

const formatBytes = (bytes: number) => {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** index).toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
};

export default function AndroidDownloadCard() {
  const [state, setState] = useState<DownloadState>("idle");
  const [progress, setProgress] = useState<DownloadProgress>({
    percent: 0,
    downloadedBytes: 0,
    totalBytes: 0,
    speedBytesPerSecond: 0,
  });
  const [message, setMessage] = useState("");
  const [installer, setInstaller] = useState<AndroidApkInstaller | null>(null);

  async function startDownload() {
    if (!ANDROID_APK_URL) {
      setState("error");
      setMessage("رابط تطبيق Mohema غير متاح حاليًا.");
      return;
    }

    if (Capacitor.getPlatform() !== "android") {
      const link = document.createElement("a");
      link.href = ANDROID_APK_URL;
      link.download = "Mohema.apk";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.click();
      return;
    }

    try {
      const { registerPlugin } = await import("@capacitor/core");
      const plugin = registerPlugin<AndroidApkInstaller>("AndroidApkInstaller");
      setInstaller(plugin);
      setState("downloading");
      setMessage("");

      await plugin.addListener("downloadProgress", (event) => {
        setProgress(event as DownloadProgress);
      });
      await plugin.addListener("downloadState", (event) => {
        const stateEvent = event as { state: string; message?: string };
        if (stateEvent.state === "preparing") setState("preparing");
        if (stateEvent.state === "error") {
          setState("error");
          setMessage(stateEvent.message || "تعذر تنزيل تطبيق Mohema.");
        }
      });

      await plugin.downloadApk({ url: ANDROID_APK_URL });
      setState("preparing");
      const result = await plugin.openInstaller();

      if (result.requiresPermission) {
        setState("complete");
        setMessage("اسمحي بالتثبيت من هذا المصدر من إعدادات Android، ثم اضغطي هنا للمتابعة.");
      } else if (!result.launched) {
        setState("complete");
        setMessage("اكتمل التنزيل. اضغطي هنا لتثبيت Mohema.");
      }
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "تعذر بدء تنزيل تطبيق Mohema.");
    }
  }

  async function cancelDownload() {
    await installer?.cancelDownload();
    setState("idle");
    setProgress({ percent: 0, downloadedBytes: 0, totalBytes: 0, speedBytesPerSecond: 0 });
  }

  async function openInstaller() {
    if (!installer) return startDownload();
    setState("preparing");
    const result = await installer.openInstaller();
    if (!result.launched) {
      setState("complete");
      setMessage(result.requiresPermission ? "اسمحي بالتثبيت من هذا المصدر من إعدادات Android." : "تعذر فتح مثبت Android.");
    }
  }

  const isAndroid = Capacitor.getPlatform() === "android";
  const isBusy = state === "downloading" || state === "preparing";

  return (
    <section dir="rtl" className="overflow-hidden rounded-[28px] border border-[#633642] bg-gradient-to-br from-[#2c1e24] via-[#211f26] to-[#18171c] p-6 shadow-[0_12px_36px_rgba(0,0,0,0.22)] md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#ffb2be]/30 bg-[#40242e] text-[#ffb2be]">
            <span className="material-symbols-outlined text-3xl">phone_android</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#f5eef0]">Get Mohema for Android</h2>
            <p className="mt-2 text-sm leading-6 text-[#d0c4c8]">Download the official Mohema Android app.</p>
            {!isAndroid && <p className="mt-2 text-xs text-[#bdb5ba]">Mohema for Android is available here.</p>}
          </div>
        </div>

        {state === "downloading" && (
          <div className="w-full md:max-w-sm">
            <div className="mb-2 flex justify-between text-xs text-[#d0c4c8]">
              <span>Downloading Mohema...</span>
              <span>{progress.percent}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[#3a2027]" role="progressbar" aria-valuenow={progress.percent} aria-valuemin={0} aria-valuemax={100}>
              <div className="h-full rounded-full bg-[#ffb2be] transition-[width] duration-300" style={{ width: `${progress.percent}%` }} />
            </div>
            <div className="mt-2 flex justify-between text-[11px] text-[#8e878c]">
              <span>{formatBytes(progress.downloadedBytes)} / {progress.totalBytes ? formatBytes(progress.totalBytes) : "..."}</span>
              <span>{progress.speedBytesPerSecond ? `${formatBytes(progress.speedBytesPerSecond)}/s` : ""}</span>
            </div>
          </div>
        )}

        {state === "preparing" && <p className="text-sm font-semibold text-[#ffb2be]">Preparing installation...</p>}
        {state === "complete" && <p className="text-sm font-semibold text-[#ffb2be]">{message || "Download complete. Tap here to install Mohema."}</p>}
        {state === "error" && <p className="text-sm font-semibold text-[#ffb2be]" role="alert">{message}</p>}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button type="button" onClick={state === "complete" ? openInstaller : startDownload} disabled={isBusy} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ffb2be] px-5 py-3 text-sm font-bold text-[#52202b] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60">
          <span className="material-symbols-outlined text-lg">{isBusy ? "sync" : state === "complete" ? "install_mobile" : "download"}</span>
          {state === "complete" ? "تثبيت Mohema" : isBusy ? (state === "preparing" ? "Preparing installation..." : "Downloading Mohema...") : "Download Mohema"}
        </button>
        {state === "downloading" && <button type="button" onClick={cancelDownload} className="rounded-xl border border-[#633642] px-5 py-3 text-sm font-semibold text-[#f5eef0] transition hover:bg-[#3a2027]">إلغاء</button>}
      </div>
    </section>
  );
}