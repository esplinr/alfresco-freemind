/**
 * Copyright (C) 2010-2012 Share Extras Contributors.
 */

/**
 * This is the "Freemind" plugin used to display documents using the google-code-Freemind project.
 *
 * It supports any text-based format such as XML/HTML mark-up, source code and CSS that are supported
 * by google code Freemind. See the Freemind project site for more information.
 * 
 * @namespace Alfresco.WebPreview.prototype.Plugins
 * @class Alfresco.WebPreview.prototype.Plugins.Freemind
 * @author Will Abson
 */
(function()
{
   /**
    * Alfresco Slingshot aliases
    */
   var $html = Alfresco.util.encodeHTML;
   
   /**
    * Freemind web-preview plugin constructor
    *
    * @constructor
    * @param wp {Alfresco.WebPreview} The Alfresco.WebPreview instance that decides which plugin to use
    * @param attributes {Object} Arbitrary attributes brought in from the <plugin> element
    * @return {Alfresco.WebPreview.prototype.Plugins.Freemind} Plugin instance
    */
   Alfresco.WebPreview.prototype.Plugins.Freemind = function(wp, attributes)
   {
      this.wp = wp;
      this.attributes = YAHOO.lang.merge(Alfresco.util.deepCopy(this.attributes), attributes);
      return this;
   };
   
   Alfresco.WebPreview.prototype.Plugins.Freemind.prototype =
   {
      /**
       * Attributes
       */
      attributes:
      {
         /**
          * Language abbreviation code to force display of a specific language, e.g. 'lang-html'
          * 
          * If not specified (or empty) will use the normal Freemind auto-detection
          * 
          * @property lang
          * @type String
          * @default ""
          */
         lang: ""
      },
   
      /**
       * Tests if the plugin can be used in the users browser.
       *
       * @method report
       * @return {String} Return nothing if the plugin may be used, otherwise returns a message containing the reason
       *         it can't be used as a string.
       * @public
       */
      report: function Freemind_report()
      {
         return (typeof(FlashObject) == "function") ? null : "FlashObject() not found!";
      },
   
      /**
       * Display the node.
       *
       * @method display
       * @public
       */
      display: function Freemind_display()
      {
  		

		//previewHeight = this.wp.setupPreviewSize();

		displaysource = '<div id="flashcontent" style="height: 500px;">';
		displaysource += 'Flash plugin or Javascript are turned off.'
		      + 'Activate both  and reload to view the mindmap</div>';

		//just to raise event?
		Alfresco.util.YUILoaderHelper.require([ "tabview" ], this.onComponentsLoaded, this);
		Alfresco.util.YUILoaderHelper.loadComponents();

      
		return displaysource;
      },
      /**
       * Required YUI components have been loaded
       * 
       * @method onComponentsLoaded
       * @public
       */
      onComponentsLoaded : function Embed_onComponentsLoaded()
      {
    	  var url = this.attributes.src ? this.wp.getThumbnailUrl(this.attributes.src) : this.wp.getContentUrl(), displaysource, previewHeight;
    	  //url ~ http://localhost:8080/share/proxy/alfresco/api/node/workspace/SpacesStore/914b705e-f2b1-4a83-b7c4-fcc8d53f3b78/content/test.mm?c=force&noCache=1362501081096&a=false
    	  url = url.substring(url.indexOf("/share/"));	  
	    	var swfUrl = Alfresco.constants.URL_CONTEXT + "res/freemind/components/preview/visorFreeplane.swf";
	
	    	
			var fo = new FlashObject(swfUrl, "visorFreeMind", "100%", "100%", 6, "#9999ff");
			fo.addParam("quality", "high");
			fo.addParam("bgcolor", "#ffffff");
			fo.addVariable("openUrl", "_blank"); // or _self
			fo.addVariable("initLoadFile", url);
			fo.addVariable("startCollapsedToLevel","5");
		    fo.addVariable("defaultWordWrap", "270");
		    fo.addVariable("buttonPos","top"); //or bottom
		    fo.addVariable("offsetX", "10");
		    fo.addVariable("offsetY", "10");
			fo.write("flashcontent");
			
		/* Flash parameters form the source!
		 * 
		 * 	// If not defined init mindmap file, use default (index.mm)
if(_root.openUrl!=null)
Node.openUrl=_root.openUrl;
if(_root.noElipseMode!=null)
Edge.elipseMode=false;
if(_root.genAllShots!=null)
HistoryManager.genAllShots=Boolean(_root.genAllShots.toLowerCase()=="true");
if(_root.unfoldAll!=null)
Browser.unfoldAll=Boolean(_root.unfoldAll.toLowerCase()=="true");
if(_root.justMap!=null)
Browser.justMap=Boolean(_root.justMap.toLowerCase()=="true");
if(_root.scaleTooltips!=null)
Browser.scaleTooltips=Boolean(_root.scaleTooltips.toLowerCase()=="true");
if(_root.toolTipsBgColor!=null)
Browser.toolTipsBgColor=Number(_root.toolTipsBgColor);
if(!isNaN(_root.defaultWordWrap))
Node.defaultWordWrap=Number(_root.defaultWordWrap);
if(!isNaN(_root.defaultToolTipWordWrap))
Browser.defaultToolTipWordWrap=Number(_root.defaultToolTipWordWrap);
if(_root.offsetX!=null && (_root.offsetX=="left" ||_root.offsetX=="left" || !isNaN(_root.offsetX)) )
Browser.offsetX=_root.offsetX;
if(_root.offsetY!=null && (_root.offsetY=="top" ||_root.offsetY=="bottom" || !isNaN(_root.offsetY)) )
Browser.offsetY=_root.offsetY;
if(_root.buttonsPos!=null && (_root.buttonsPos=="top" ||_root.buttonsPos=="bottom" ) )
ButtonsCreator.buttonsPos=_root.buttonsPos;
if(!isNaN(_root.max_alpha_buttons))
ButtonsCreator.max_alpha_buttons=Number(_root.max_alpha_buttons);
if(!isNaN(_root.min_alpha_buttons))
ButtonsCreator.min_alpha_buttons=Number(_root.min_alpha_buttons);
if(!isNaN(_root.startCollapsedToLevel))
Browser.startCollapsedToLevel=Number(_root.startCollapsedToLevel);
if(_root.mainNodeShape=="rectangle" || _root.mainNodeShape=="none")
Node.mainNodeShape=_root.mainNodeShape;
if(!isNaN(_root.ShotsWidth))
PictureTaker.ShotsWidth=Number(_root.ShotsWidth);
if(_root.baseImagePath!=null)
Node.baseImagePath=_root.baseImagePath;
if(_root.CSSFile!=null)
Browser.CSSFile=_root.CSSFile;
if(_root.initLoadFile!=null){
browser=new Browser(_root.initLoadFile,_root);
}
else{
browser=new Browser("index.mm",_root);
}


		 * */
		
         
      }
      

   };
})();