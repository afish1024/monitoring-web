<template>
    <div>
        
        <div style="border: 1px solid #ccc; margin-top: 10px;">
            <Toolbar
                :editor="editorRef"
                :defaultConfig="toolbarConfig"
                :mode="mode"
                style="border-bottom: 1px solid #ccc"
            />
            <Editor
                :defaultConfig="editorConfig"
                :mode="mode"
                v-model="valueHtml"
                style="height: 300px; overflow-y: hidden;"
                @onCreated="handleCreated"
                @onChange="handleChange"
                @onDestroyed="handleDestroyed"
                @onFocus="handleFocus"
                @onBlur="handleBlur"
                @customAlert="customAlert"
                @customPaste="customPaste"
                
            />
        </div>
        <div >
            <a-drawer
                :title="'编辑器HTML代码'"
                :width="600"
                :visible="visible"
                :destroy-on-close="true"
                :body-style="{ paddingBottom: '80px' }"
                :footer-style="{ textAlign: 'right' }"
                @close="onClose"
	        >
            <a-textarea v-model:value="valueHtml" disabled  auto-size/>
            <template #footer>
                <a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
            </template>
            </a-drawer>
        </div>
        <!-- <div>
            <NewUpload  @successfulImg="successImg" :isShowPic="false" ref="upload" :action="imageAction"/>
            <NewUploadVideo @uploadDone="uploadDoneVideo" ref="refVideo" :action="videoAction"/>                 
        </div> -->
    </div>
</template>

<script>
import './botton'
// import '@wangeditor/editor/dist/css/style.css'
// import NewUpload from '@/components/NewUpload/index.vue'
// import NewUploadVideo from '@/components/NewUploadVideo/index.vue'
import { onBeforeUnmount, ref, shallowRef, onMounted,defineComponent } from 'vue'
// import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import bus from "./bus"
import sysConfig from '@/config/index'
import tool from '@/utils/tool'
const userInfo = tool.data.get('USER_INFO')
export default {
//   components: { Editor, Toolbar,NewUpload,NewUploadVideo},
components: { Editor, Toolbar},
  props:{
    content: {
            type: String,
            default:''
        } 
        
    },
  setup(props,{emit}) {
    // 编辑器实例，必须用 shallowRef，重要！
    const editorRef = shallowRef()
    // const upload = ref(null)
    // const refVideo = ref(null)
    const visible = ref(false)
    // const videoAction = ref('attachment/upload?type=2&imgRecord=1&managerId='+userInfo.id)
    // const imageAction = ref('attachment/upload?type=1&imgRecord=1&managerId='+userInfo.id)
    const onClose = () =>{
        visible.value = false
         
    }
    const uploadDoneVideo = (val)=>{

    }
    const successImg = (val) => {
        // console.log(val)
        // if(val.checkPicList.length){
        //     val.checkPicList.map((data)=>{
        //         val.insertImg.value(data.filePath)
        //     })
        // }
    }
    // 内容 HTML
    const valueHtml = ref(props.content)
    watch(
		() => props.content,
		(newVal, oldVal) => {
            console.log('newVal:'+newVal)
			valueHtml.value = newVal
		}
	)
    // 模拟 ajax 异步获取内容
    onMounted(() => {
        //valueHtml.value = props.content
        // setTimeout(() => {
        //     valueHtml.value = '<p>禁止黏贴图片，请输入内容...</p>'
        // }, 1500)
        console.log('content'+props.content)
        bus.on('html',(data)=>{
            visible.value = true
            //console.log(visible.value )
        })
    })

    const toolbarConfig = {
        insertKeys:{
            index:0,
            keys: ['menu4']
        },
        excludeKeys:["emotion","codeBlock","insertTable","fullScreen"]
        
    }
    const editorConfig = { 
        placeholder: '禁止复制图片，请输入内容...' ,
        autoFocus:true,
        MENU_CONF:{
            insertImage:{

            },
            uploadImage:{
                // customBrowseAndUpload(insertFn) {
                //    // alert('自定义选择文件，如弹出图床')
                //    //upload.value.onOpen(insertFn)
                //     // 自己上传文件
                //     // 上传之后用 insertFn(fileName, link) 插入到编辑器
                //     // imagesList.value.map((item)=>{
                //     //     insertFn(item)
                //     // })
                    
                //  }
                fieldName: 'file',
                server: sysConfig.API_URL + '/dev/file/uploadDynamicReturnUrl',
                // 单个文件的最大体积限制，默认为 2M
                maxFileSize: 10 * 1024 * 1024, // 1M

                // 最多可上传几个文件，默认为 100
                maxNumberOfFiles: 10,

                // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
                allowedFileTypes: ['image/*'],

                // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
                meta: {
                    token: tool.data.get('TOKEN'),
                    
                },

                // 将 meta 拼接到 url 参数中，默认 false
                metaWithUrl: true,

                // 自定义增加 http  header
                headers: {
                     
                    token: tool.data.get('TOKEN'), 
                },

                // 跨域是否传递 cookie ，默认为 false
                withCredentials: false,

                // 超时时间，默认为 10 秒
                timeout: 5 * 1000, // 5 秒

                // 单个文件上传成功之后
              
                onSuccess(file, res) {          // JS 语法
                    console.log(res.data)
                },
                customInsert(res, insertFn) {
                    insertFn(res.data);
                }
                // onError(file, err, res) {               // JS 语法
                //     console.log(`${file.name} 上传出错`, err, res)
                // },
            },
            uploadVideo:{
                // customBrowseAndUpload(insertFn) {
                //    // refVideo.value.onOpen(insertFn)
                //    // alert('自定义选择视频，如弹出图床')
                //     //document.querySelector('.ant-upload').click()
                //     // 自己上传文件
                //     // 上传之后用 insertFn(fileName, link) 插入到编辑器
                //     //insertFn()
                //  }
                fieldName: 'file',
                server: sysConfig.API_URL + '/dev/file/uploadDynamicReturnUrl',
                // 单个文件的最大体积限制，默认为 2M
                maxFileSize: 1000 * 1024 * 1024, // 1M

                // 最多可上传几个文件，默认为 100
                maxNumberOfFiles: 5,

                // / 选择文件时的类型限制，默认为 ['video/*'] 。如不想限制，则设置为 []
                allowedFileTypes: ['video/*'],

                // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
                meta: {
                    token: tool.data.get('TOKEN'),
                    
                },

                // 将 meta 拼接到 url 参数中，默认 false
                metaWithUrl: true,

                // 自定义增加 http  header
                headers: {
                     
                    token: tool.data.get('TOKEN'), 
                },

                // 跨域是否传递 cookie ，默认为 false
                withCredentials: false,

                // 超时时间，默认为 10 秒
                timeout: 5 * 1000, // 5 秒

                // 单个文件上传成功之后
              
                onSuccess(file, res) {          // JS 语法
                    console.log(res.data)
                },
                customInsert(res, insertFn) {
                    insertFn(res.data);
                }
            }
        }
    }

    // 组件销毁时，也及时销毁编辑器，重要！
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return

        editor.destroy()

        //bus.off('html')
    })

    // 编辑器回调函数
    const handleCreated = (editor) => {
      //console.log('created', editor);
      editorRef.value = editor // 记录 editor 实例，重要！
    }
    const handleChange = (editor) => {
      //console.log('change:', editor.getHtml());
      //console.log(editor.getText());
      emit('editorContent',valueHtml.value)
    }
    const handleDestroyed = (editor) => {
      console.log('destroyed', editor)
    }
    const handleFocus = (editor) => {
        console.log('focus', editor)
        //console.log(editor.getConfig())
        
    }
    const handleBlur = (editor) => {
        console.log('blur', editor)
        
    }
    const customAlert = (info, type) => {
        alert(`【自定义提示】${type} - ${info}`)
    }
    const customPaste = (editor, event, callback) => {
        console.log('ClipboardEvent 粘贴事件对象', event)

        // 自定义插入内容
        //editor.insertText('xxx')

        // 返回值（注意，vue 事件的返回值，不能用 return）
        //callback(false) // 返回 false ，阻止默认粘贴行为
         callback(true) // 返回 true ，继续默认的粘贴行为
    }

    const insertText = () => {
        const editor = editorRef.value
        if (editor == null) return
        editor.insertText('hello world')
    }

    const printHtml = () => {
        const editor = editorRef.value
        if (editor == null) return
        console.log(editor.getHtml())
    }

    const disable = () => {
        const editor = editorRef.value
        if (editor == null) return
        editor.disable()
    }

    return {
      //imageAction,   
      //videoAction,
      //refVideo,
     // uploadDoneVideo,
      //successImg,
      //upload,
      visible,
      onClose,
      editorRef,
      mode: 'default',
      valueHtml,
      toolbarConfig,
      editorConfig,
      handleCreated,
      handleChange,
      handleDestroyed,
      handleFocus,
      handleBlur,
      customAlert,
      customPaste,
      insertText,
      printHtml,
      disable,
    };
  }
}
</script>
