import Exceptions = require("../Exceptions");
import BufferTargetType = require("./BufferTargetType");
import ShaderType = require("./ShaderType");
import ClearTargetType = require("./ClearTargetType");
import PrimitiveTopology = require("./PrimitiveTopology");
import ElementType = require("./ElementType");
import Matrix = require("../Math/Matrix");
import JThreeObject = require("../Base/JThreeObject");
import Vector2 = require("../Math/Vector2");
import Vector3 = require("../Math/Vector3");
import Vector4 = require("../Math/Vector4");
import GLFeatureType = require("./GLFeatureType");
import GLCullMode = require("./GLCullMode");
import TargetTextureType = require("./TargetTextureType");
import FrameBufferAttachmentType = require("./FrameBufferAttachmentType");
import TextureInternalFormatType = require("./TextureInternalFormatType");
import TextureType = require("./TextureType");
import TextureParameterType = require("./Texture/TextureParameterType");
import TextureMinType = require("./Texture/TextureMinFilterType");
import TextureMagType = require("./Texture/TextureMagFilterType");
import TextureWrapType = require("./Texture/TextureWrapType");
import TextureRegister = require("./Texture/TextureRegister");
import RenderBufferInternalFormats = require("./RBO/RBOInternalFormat");
import PixelStoreParamType = require("./Texture/PixelStoreParamType");
import BlendEquationType = require("./BlendEquationType");
import BlendFuncParamType = require("./BlendFuncParamType");
import DepthFuncType = require("./DepthFuncType");
import GetParameterType = require("./GetParameterType");
import TexImageTargetType = require("./Texture/TexImageTargetType");
import JThreeEvent = require("../Base/JThreeEvent");
import Delegates = require("../Base/Delegates");
class GLContextWrapperBase extends JThreeObject
{
    /**
     * Maximum count of errors to be dislayed.
     */
    public static maximumOutputGLError = 1000;

    private glErrorCount=0;
    /**
     * Event handler register to gl error.
     */
    private glErrorHandler = new JThreeEvent<string>();

    protected notifyGlError(error: string) {
        this.glErrorCount++;
        if(this.glErrorCount<=GLContextWrapperBase.maximumOutputGLError)this.glErrorHandler.fire(this, error);
        if (this.glErrorCount === GLContextWrapperBase.maximumOutputGLError) {
            console.error("There is too many glError,for preventing freezing error not displayed any more.");
        }
    }

    public glError(listener:Delegates.Action2<GLContextWrapperBase,string>) {
        this.glErrorHandler.addListener(listener);
    }

    public get Context(): WebGLRenderingContext
    {
        return null;
    }

    /**
     * Check gl error, and abort if error has been occured.
     */
    public CheckErrorAsFatal(): void
    {
        throw new Exceptions.AbstractClassMethodCalledException();
    }
    /**
     * Create WebGLBuffer
     * @returns {The new buffer reference that has been created.}
     */
    public CreateBuffer(): WebGLBuffer
    {
        throw new Exceptions.AbstractClassMethodCalledException();
    }
    /**
     * Bind the WebGLBuffer
     * @param target target buffer you want to bind
     * @param buffer the buffer you want to bind
     */
    public BindBuffer(target: BufferTargetType, buffer: WebGLBuffer): void
    {
        throw new Exceptions.AbstractClassMethodCalledException();
    }
    /**
     * Store data to buffer
     * @param target target type you want to store data
     * @param array data source array
     * @param usage type how to use data source
     */
    public BufferData(target: BufferTargetType, array: ArrayBuffer, usage: number): void
    {
        throw new Exceptions.AbstractClassMethodCalledException();
    }
    /**
     * Unbind buffer
     * @param target the buffer type you want to unbind
     */
    public UnbindBuffer(target: BufferTargetType): void
    {
        throw new Exceptions.AbstractClassMethodCalledException();
    }

    /**
     * Set the clear color it will be used when you call Clear()
     * @param red red color value [0,1]
     * @param green green color value [0,1]
     * @param blue blue color value [0,1]
     * @param alpha alpha color value [0,1]
     */
    public ClearColor(red: number, green: number, blue: number, alpha: number): void
    {
        throw new Exceptions.AbstractClassMethodCalledException();
    }
    /**
     * Clear buffers
     * @param mask type of buffer you want to clear
     */
    public Clear(mask: ClearTargetType): void
    {
        throw new Exceptions.AbstractClassMethodCalledException();
    }

    /**
     * Get attribute variable location from program
     * @param program the program you want to locate attribute variable
     * @param name attribute variable name
     * @returns {attribute variable location}
     */
    public GetAttribLocation(program: WebGLProgram, name: string): number
    {
        throw new Exceptions.AbstractClassMethodCalledException();
    }
    /**
     * Enable vartex attribute array
     * @param attribNumber the attribute variable location you want to enable vertex attribute array
     */
    public EnableVertexAttribArray(attribNumber: number): void
    {
        throw new Exceptions.AbstractClassMethodCalledException();
    }
    /**
     * Pass buffer to attribute variable.
     * @param attribLocation attribute variable location
     * @param sizePerVertex element count per vertex
     * @param elemType the variable type you will pass
     * @param normalized is this normalized or not(ALWAYS should be false)
     * @param stride stride in buffer array
     * @param offset offset of buffer array
     */
    public VertexAttribPointer(attribLocation: number, sizePerVertex: number, elemType: ElementType, normalized: boolean, stride: number, offset: number): void
    {
        throw new Exceptions.AbstractClassMethodCalledException();
    }

    /**
     * Flush drawing
     */
    public Flush(): void
    {
        throw new Exceptions.AbstractClassMethodCalledException();
    }
    /**
     * Finish drawing
     */
    public Finish()
    {
        throw new Exceptions.AbstractClassMethodCalledException();
    }
    /**
     * Delete buffer
     * @param target the buffer you want to delete
     */
    public DeleteBuffer(target: WebGLBuffer): void
    {
        throw new Exceptions.AbstractClassMethodCalledException();
    }
    /**
     * Delete program
     * @param target the program you want to delete.
     */
    public DeleteProgram(target: WebGLProgram): void
    {
        throw new Exceptions.AbstractClassMethodCalledException();
    }
    /**
     * Get uniform variable location
     * @param target the program you want to locate uniform variable
     * @param name the name of uniform variable
     */
    public GetUniformLocation(target: WebGLProgram, name: string): WebGLUniformLocation
    {
        throw new Exceptions.AbstractClassMethodCalledException();
    }


    public CullFace(cullMode: GLCullMode): void
    {
        throw new Exceptions.AbstractClassMethodCalledException();
    }
    /**
     * Set viewport configure
     * @param x X of left-bottom screen coordinate
     * @param y Y of left-bottom screen coordinate
     * @param width width of viewport
     * @param height height of viewport
     */
    public ViewPort(x: number, y: number, width: number, height: number): void
    {
        throw new Exceptions.AbstractClassMethodCalledException();
    }

    public DrawElements(topology: PrimitiveTopology, length: number, dataType: ElementType, offset: number): void
    {
        throw new Exceptions.AbstractClassMethodCalledException();
    }

    public CreateFrameBuffer(): WebGLFramebuffer
    {
        throw new Exceptions.AbstractClassMethodCalledException();
    }

    public BindFrameBuffer(fbo: WebGLFramebuffer): void
    {
        throw new Exceptions.AbstractClassMethodCalledException();
    }

    public FrameBufferTexture2D(fboTarget: FrameBufferAttachmentType, tex: WebGLTexture): void
    {
        throw new Exceptions.AbstractClassMethodCalledException();
    }

    public CreateRenderBuffer(): WebGLRenderbuffer
    {
        throw new Exceptions.AbstractClassMethodCalledException();
    }

    public BindRenderBuffer(bindTarget: WebGLRenderbuffer): void
    {
        throw new Exceptions.AbstractClassMethodCalledException();
    }

    public RenderBufferStorage(internalFormat: RenderBufferInternalFormats, width: number, height: number): void
    {
        throw new Exceptions.AbstractClassMethodCalledException();
    }

    public FrameBufferRenderBuffer(attachment: FrameBufferAttachmentType, buffer: WebGLRenderbuffer)
    {
        throw new Exceptions.AbstractClassMethodCalledException();
    }

    public ClearDepth(depth: number)
    {
        throw new Exceptions.AbstractClassMethodCalledException();
    }

    public BlendFunc(b1: BlendFuncParamType, b2: BlendFuncParamType)
    {

    }

    public BlendEquation(eq: BlendEquationType)
    {

    }

    public DepthFunc(func: DepthFuncType)
    {

    }

    public GetParameter(type: GetParameterType):number
    {
      return undefined;
    }
}
export =GLContextWrapperBase;
