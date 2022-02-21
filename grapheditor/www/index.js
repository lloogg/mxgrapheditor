// Extends EditorUi to update I/O action states based on availability of backend
var editorUi;
var editorUiInit = EditorUi.prototype.init;
import defaultXml from "./styles/default.xml";
import bundles from "./resources/grapheditor.txt";
EditorUi.prototype.init = function () {
  editorUiInit.apply(this, arguments);
  this.actions.get("export").setEnabled(false);

  // Updates action states which require a backend
  if (!Editor.useLocalStorage) {
    mxUtils.post(
      OPEN_URL,
      "",
      mxUtils.bind(this, function (req) {
        var enabled = req.getStatus() != 404;
        this.actions.get("open").setEnabled(enabled || Graph.fileSupport);
        this.actions.get("import").setEnabled(enabled || Graph.fileSupport);
        this.actions.get("save").setEnabled(enabled);
        this.actions.get("saveAs").setEnabled(enabled);
        this.actions.get("export").setEnabled(enabled);
      })
    );
  }
};

// Adds required resources (disables loading of fallback properties, this can only
// be used if we know that all keys are defined in the language specific file)
mxResources.loadDefaultBundle = false;

mxResources.parse(bundles);

// Configures the default graph theme
var themes = new Object();
themes[Graph.prototype.defaultThemeName] =
  mxUtils.parseXml(defaultXml).documentElement;
// Main
editorUi = new EditorUi(new Editor(urlParams["chrome"] == "0", themes));
window.editor = editorUi.editor;
