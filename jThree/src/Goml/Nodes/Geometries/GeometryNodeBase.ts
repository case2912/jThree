import GomlTreeNodeBase = require("../../GomlTreeNodeBase");
import JThreeID = require("../../../Base/JThreeID");
import Geometry = require("../../../Core/Geometries/Base/Geometry");
/**
* Base class for managing geometry node.
*/
class GeometryNodeBase extends GomlTreeNodeBase {
  constructor() {
    super();
    this.attributes.defineAttribute({
      'name': {
        value: undefined,
        converter: 'string',
      }
    });
  }

  private name: string;
  /**
  * GOML Attribute
  * Identical Name for geometry
  */
  public get Name(): string {
    return this.name;
  }

  private targetGeometry: Geometry;

  /**
  * The geometry this node managing.
  */
  public get TargetGeometry(): Geometry {
    return this.targetGeometry;
  }
  /**
  * Generate geometry instance for the geometry.
  * You need to override this function to extend this class.
  */
  protected ConstructGeometry(): Geometry {
    return null;
  }

  protected groupPrefix: string = 'geometry';

  protected onMount(): void {
    super.onMount();
    this.name = this.attributes.getValue('name'); // TODO: pnly
    this.targetGeometry = this.ConstructGeometry();
    this.nodeExport(this.Name);
  }
}
export = GeometryNodeBase;
