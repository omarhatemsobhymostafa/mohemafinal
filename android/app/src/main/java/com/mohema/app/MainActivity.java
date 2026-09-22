package com.mohema.app;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
	public MainActivity() {
		registerPlugin(AndroidApkInstallerPlugin.class);
	}
}
