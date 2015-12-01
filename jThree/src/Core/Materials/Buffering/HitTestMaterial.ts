import IMaterialConfig = require("../IMaterialConfig");
import Material = require("./../Material");
import Program = require("../../Resources/Program/Program");
import RendererBase = require("../../Renderers/RendererBase");
import SceneObject = require("../../SceneObject");
import Matrix = require("../../../Math/Matrix");
import Vector4 = require("../../../Math/Vector4");
import Scene = require('../../Scene');
import ResolvedChainInfo = require('../../Renderers/ResolvedChainInfo');
import RenderStageBase = require("../../Renderers/RenderStages/RenderStageBase");
declare function require(string): string;

class HitTestMaterial extends Material {
    protected program: Program;
    constructor() {
        super();
        var vs = require('../../Shaders/VertexShaders/BasicGeometries.glsl');
        var fs = require('../../Shaders/SolidColor.glsl');
        this.program = this.loadProgram("jthree.shaders.vertex.basic", "jthree.shaders.fragment.solidcolor", "jthree.programs.solidcolor", vs, fs);
        this.setLoaded();
    }

    public configureMaterial(scene: Scene, renderStage: RenderStageBase, object: SceneObject, texs: ResolvedChainInfo, techniqueIndex: number, passIndex: number): void {
        var renderer = renderStage.Renderer;
        super.configureMaterial(scene, renderStage, object, texs, techniqueIndex, passIndex);
        var r = 0xFF00 & (renderStage as any).___objectIndex;
        var g = 0x00FF & (renderStage as any).___objectIndex;
        var geometry = object.Geometry;
        var programWrapper = this.program.getForContext(renderer.ContextManager);
        var v = object.Transformer.calculateMVPMatrix(renderer);
        programWrapper.register({
            attributes: {
                position: geometry.PositionBuffer,
                normal: geometry.NormalBuffer
            },
            uniforms: {
                matMVP: { type: "matrix", value: v },
                matMV: { type: "matrix", value: Matrix.multiply(renderer.Camera.viewMatrix, object.Transformer.LocalToGlobal) },
                u_color: { type: "vector", value: new Vector4(r /0xFF,  g/0xFF, 0, 1) }
            }
        });
        geometry.IndexBuffer.getForContext(renderer.ContextManager).bindBuffer();
    }

    public getMaterialConfig(pass: number, technique: number): IMaterialConfig {
        return {
            cull: "ccw",
            blend: false
        }
    }

    public get MaterialGroup(): string {
        return "jthree.materials.hitarea";
    }
}

export =HitTestMaterial;