package io.ionic.keyboard;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.content.Intent;
import android.graphics.Rect;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.View;
import android.view.ViewTreeObserver.OnGlobalLayoutListener;
import android.view.inputmethod.InputMethodManager;

import java.text.SimpleDateFormat;
import java.util.Calendar;


public class IonicKeyboard extends CordovaPlugin  {
    Context context;

    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
    }

    public boolean execute(String action,final JSONArray args, final CallbackContext callbackContext) throws JSONException {

        if ("sumtkt".equals(action)) {
            Log.d("action",action);
            cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                    Log.d("Function",args.toString());
                    try {
                        JSONObject b = args.getJSONObject(0);
                        String func   = b.getString("func");
                        if("sum".equals(func)) {
                            String dater = b.getString("dater");
                            String cname = b.getString("busname");
                            String caddress = b.getString("busaddress");
                            String source = b.getString("source");
                            String destination = b.getString("destination");
                            String busfare = b.getString("busfare");
                            String[] firstname = b.getString("firstname").split(",");
                            String[] lastname = b.getString("lastname").split(",");
                            String[] mobile = b.getString("mobile").split(",");
                            String[] idn = b.getString("idn").split(",");
                            String ticket = b.getString("ticket");
                            String agent = b.getString("agent");
                            String busid = b.getString("busid");
                            String seat = b.getString("seat");
                            String total = b.getString("total");

                            Calendar c = Calendar.getInstance();
                            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                            String formattedDate = df.format(c.getTime());
                            Log.d("buspp", " " + formattedDate);
                            Log.d("buspp", func);
                            Log.d("buspp", cname);
                            Log.d("buspp", caddress);
                            Log.d("buspp", ticket);
                            Log.d("buspp", firstname[0] + " " + lastname[0]);
                            Log.d("buspp", mobile[0]);
                            Log.d("busapp", idn[0]);
                            Log.d("busapp", busid);
                            Log.d("buspp", seat);
                            Log.d("buspp", dater);
                            Log.d("buspp", source);
                            Log.d("buspp", destination);
                            Log.d("buspp", total);
                            Log.d("buspp", agent);
                        }else{

                            String cname = b.getString("busname");
                            String caddress = b.getString("busaddress");
                            String agent = b.getString("agent");
                            String nob = b.getString("nob");
                            String tfc = b.getString("tfc");
                            Integer s = cname.length();
                            Integer temp = (32 - s)/2;
                            String am = "";
                            for(int p =1;p <= temp;p++) {
                                am += " ";
                            }
                            Integer ss = caddress.length();
                            Integer temps = (32 - ss)/2;
                            String ams = "";
                            for(int p =1;p <= temps;p++){
                                ams +=" ";
                            }
                            Log.d("bname",am+cname);
                            Log.d("baddress",ams+caddress);
                            Log.d("caddress",caddress);
                            Log.d("agent",agent);
                            Log.d("nob",nob);
                            Log.d("tfc",tfc);

                        }

                        context = cordova.getActivity();
                        Intent intent = new Intent();
                        intent.setClassName("android_serialport_api.sample3","android_serialport_api.sample3.ConsoleActivity");
                        intent.putExtra("jsonArray",args.toString());
                        context.startActivity(intent);

                    } catch (JSONException e) {
                        e.printStackTrace();
                        Log.d("problem"," "+e);
                    }
                }
            });
            return true;
        }



        if ("close".equals(action)) {
            cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                    //http://stackoverflow.com/a/7696791/1091751
                    InputMethodManager inputManager = (InputMethodManager) cordova.getActivity().getSystemService(Context.INPUT_METHOD_SERVICE);
                    View v = cordova.getActivity().getCurrentFocus();

                    if (v == null) {
                        callbackContext.error("No current focus");
                    } else {
                        inputManager.hideSoftInputFromWindow(v.getWindowToken(), InputMethodManager.HIDE_NOT_ALWAYS);
                        callbackContext.success(); // Thread-safe.
                    }
                }
            });
            return true;
        }


        if ("show".equals(action)) {
            cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                    ((InputMethodManager) cordova.getActivity().getSystemService(Context.INPUT_METHOD_SERVICE)).toggleSoftInput(0, InputMethodManager.HIDE_IMPLICIT_ONLY);
                    callbackContext.success(); // Thread-safe.
                }
            });
            return true;
        }

        if ("init".equals(action)) {
            cordova.getThreadPool().execute(new Runnable() {
                public void run() {
                	//calculate density-independent pixels (dp)
                    //http://developer.android.com/guide/practices/screens_support.html
                    DisplayMetrics dm = new DisplayMetrics();
                    cordova.getActivity().getWindowManager().getDefaultDisplay().getMetrics(dm);
                    final float density = dm.density;

                    //http://stackoverflow.com/a/4737265/1091751 detect if keyboard is showing
                    final View rootView = cordova.getActivity().getWindow().getDecorView().findViewById(android.R.id.content).getRootView();
                    OnGlobalLayoutListener list = new OnGlobalLayoutListener() {
                        int previousHeightDiff = 0;
                        @Override
                        public void onGlobalLayout() {
                            Rect r = new Rect();
                            //r will be populated with the coordinates of your view that area still visible.
                            rootView.getWindowVisibleDisplayFrame(r);

                            PluginResult result;

                            int heightDiff = rootView.getRootView().getHeight() - r.bottom;
                            int pixelHeightDiff = (int)(heightDiff / density);
                            if (pixelHeightDiff > 100 && pixelHeightDiff != previousHeightDiff) { // if more than 100 pixels, its probably a keyboard...
                            	String msg = "S" + Integer.toString(pixelHeightDiff);
                                result = new PluginResult(PluginResult.Status.OK, msg);
                                result.setKeepCallback(true);
                                callbackContext.sendPluginResult(result);
                            }
                            else if ( pixelHeightDiff != previousHeightDiff && ( previousHeightDiff - pixelHeightDiff ) > 100 ){
                            	String msg = "H";
                                result = new PluginResult(PluginResult.Status.OK, msg);
                                result.setKeepCallback(true);
                                callbackContext.sendPluginResult(result);
                            }
                            previousHeightDiff = pixelHeightDiff;
                         }
                    };

                    rootView.getViewTreeObserver().addOnGlobalLayoutListener(list);


                    PluginResult dataResult = new PluginResult(PluginResult.Status.OK);
                    dataResult.setKeepCallback(true);
                    callbackContext.sendPluginResult(dataResult);
                }
            });
            return true;
        }
        return false;  // Returning false results in a "MethodNotFound" error.
    }



}


