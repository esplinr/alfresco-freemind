if (model.widgets)
{
   for (var i = 0; i < model.widgets.length; i++)
   {
      var widget = model.widgets[i];
      if (widget.id == "WebPreview")
      {
         var conditions = [];
         // Insert new pluginCondition(s) at start of the chain
         conditions.push({
            attributes: {
               mimeType: "application/x-freemind"
            },
            plugins: [{
               name: "Freemind",
               attributes: {}
            }
//            ,
//            {
//               name: "Embed",
//               attributes: {}
//            }
            ]
         });
         conditions.push({
            attributes: {
               thumbnail: "mm"
            },
            plugins: [{
               name: "Freemind",
               attributes: { src: "mm" }
            }
//            ,
//            {
//               name: "Embed",
//               attributes: { src: "mm" }
//            }
            ]
         });
         var oldConditions = eval("(" + widget.options.pluginConditions + ")");
         // Add the other conditions back in
         for (var j = 0; j < oldConditions.length; j++)
         {
            conditions.push(oldConditions[j]);
         }
         // Override the original conditions
         model.pluginConditions = jsonUtils.toJSONString(conditions);
         widget.options.pluginConditions = model.pluginConditions;
      }
   }
}