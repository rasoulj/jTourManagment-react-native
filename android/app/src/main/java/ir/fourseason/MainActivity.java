package ir.fourseason;

import com.facebook.react.ReactActivity;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage; // <-- Add to ReactNativeI18n to the imports
import com.facebook.react.shell.MainReactPackage;
import com.facebook.react.ReactPackage;


import java.util.Arrays;
import java.util.List;

import android.os.Bundle;
import android.app.Activity;

public class MainActivity extends ReactActivity {
    public static Activity activity;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        activity = this;
        return "NativebaseKitchenSink";
    }

    @Override
    protected void onCreate (Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);

    }

}
