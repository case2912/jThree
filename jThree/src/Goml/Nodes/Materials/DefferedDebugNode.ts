import DebugSprite = require("../../../Core/Materials/Forward/SpriteMaterial");
import GomlTreeNodeBase = require("../../GomlTreeNodeBase");
import MaterialNodeBase = require('./MaterialNodeBase');
import Material = require('../../../Core/Materials/Material')
import ViewportNode = require('../Renderers/ViewPortNode');
import ResourceManager = require("../../../Core/ResourceManager");
import JThreeContext = require("../../../JThreeContext");
import ContextComponents = require("../../../ContextComponents");
class DefferedDebugNode extends MaterialNodeBase {
  public material: DebugSprite;

  constructor() {
    super();
    this.attributes.defineAttribute({
      "target": {
        value: "rb1",
        converter: "string",
      },
      "viewport": {
        value: "viewport",
        converter: "string",
      },
      "R": {
        value: "0",
        converter: "number",
      },
      "G": {
        value: "1",
        converter: "number",
      },

      "B": {
        value: "2",
        converter: "number",
      },
      "A": {
        value: "3",
        converter: "number",
      }
    });
    this.attributes.getAttribute('viewport').on('changed', this._onViewportAttrChanged.bind(this));
    this.attributes.getAttribute('R').on('changed', ((attr) => {
      this.material.ctR = attr.Value;
    }).bind(this));
    this.attributes.getAttribute('G').on('changed', ((attr) => {
      this.material.ctG = attr.Value;
    }).bind(this));
    this.attributes.getAttribute('B').on('changed', ((attr) => {
      this.material.ctB = attr.Value;
    }).bind(this));
    this.attributes.getAttribute('A').on('changed', ((attr) => {
      this.material.ctA = attr.Value;
    }).bind(this));
  }

  private _onViewportAttrChanged(attr): void {
    var viewportTargets = this.nodeManager.getNodeByQuery(attr.Value);
    if (viewportTargets.length > 0) {
      var viewport = <ViewportNode>viewportTargets[0];
      JThreeContext.getContextComponent<ResourceManager>(ContextComponents.ResourceManager).
        getTextureHandler(viewport.TargetViewport.ID + "." + this.attributes.getValue('target'), (v) => {
        this.material.texture = v;
      });
    }
  }

  protected ConstructMaterial(): Material {
    this.material = new DebugSprite();
    return this.material;
  }

  public beforeLoad() {
    super.beforeLoad();
  }

}

export =DefferedDebugNode;
