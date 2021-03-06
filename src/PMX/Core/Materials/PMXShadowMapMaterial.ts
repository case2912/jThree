import BasicMaterial from "../../../Core/Materials/Base/BasicMaterial";
import IApplyMaterialArgument from "../../../Core/Materials/Base/IApplyMaterialArgument";
import Geometry from "../../../Core/Geometries/Base/Geometry";
import PMXMaterial from "./PMXMaterial";
/**
 * the materials for PMX.
 */
class PMXShadowMapMaterial extends BasicMaterial {
  protected associatedMaterial: PMXMaterial;

  constructor(material: PMXMaterial) {
    super(require("../../Materials/ShadowMap.html"));
    this.associatedMaterial = material;
    this.setLoaded();
  }

  /**
   * Count of verticies
   */
  public get VerticiesCount() {
    return this.associatedMaterial.VerticiesCount;
  }

  /**
   * Offset of verticies in index buffer
   */
  public get VerticiesOffset() {
    return this.associatedMaterial.VerticiesOffset;
  }

  public apply(matArg: IApplyMaterialArgument): void {
    if (this.associatedMaterial.Diffuse.A < 1.0E-3) {
      return;
    }
    // var light = matArg.scene.LightRegister.shadowDroppableLights[matArg.techniqueIndex];
    // const skeleton = this.associatedMaterial.ParentModel.skeleton;
    // this.materialVariables = {
    //    matL:light.matLightViewProjection,
    //    boneMatriciesTexture:skeleton.MatrixTexture,
    //    boneCount:skeleton.BoneCount
    // };
    super.apply(matArg);
  }


  public get Priorty(): number {
    return 100;
  }

  public getDrawGeometryLength(geo: Geometry): number {
    return this.associatedMaterial.Diffuse.A > 0 ? this.VerticiesCount : 0;
  }

  public getDrawGeometryOffset(geo: Geometry): number {
    return this.VerticiesOffset * 4;
  }
}

export default PMXShadowMapMaterial;
