<template>
    <a-modal
    v-model:visible="myTableInfo.visible"
    :width="myTableInfo.width"
    :title="myTableInfo.title"
    @ok="handleOk"
    @cancel="handleCancel"
    :destroyOnClose="true"
    :maskClosable="false"
    :forceRender="true"
    >
    <a-table
        :columns="columns"
        :dataSource="myTableInfo.localDataSource"
        bordered
        :loading = "myTableInfo.loading"
        :row-selection="rowSelection"
        :rowKey="(record) => record.id"
        :pagination="pagination.show"
       ></a-table>
       <div class="pagination">
            <a-pagination 
            v-model:current="pagination.current" 
            :total="myTableInfo.total" 
            v-if="pagination.show" 
            showSizeChanger 
            @change="changeSize"
            @showSizeChange="showSizeChange"
            :defaultPageSize="pagination.size"
            />
       </div>
    </a-modal>
</template>
<script >
import { defineComponent, ref, reactive,computed,toRefs } from "vue";
import { message, Empty } from 'ant-design-vue'
import indexApi from '@/api/python/indexApi'
export default defineComponent({
    props:{
        data: {
            type: Array,
            required: true
        },
        columns:{
            type: Array,
            required: true
        },
        pagination:{
            type:Object,
            required: true
        },
        rowSelectionType:{
            type:Object,
            required: true
        },
        
    },
    setup(props,{emit}){
        const {columns,pagination,data,rowSelectionType} = toRefs(props)
        const selectedRowKeys = ref([])
        console.log(selectedRowKeys.value)
        const Rows = ref([])
        const myTableInfo = reactive({
            width:0,
            title:'',
            visible:false,
            localDataSource:[],
            total:0,
            loading:true,
            show:false,
            defaultIds:[]
        })
        const onOpen = (data)=>{
        console.log('data',data)
            myTableInfo.width = data.width
            myTableInfo.title = data.title
            myTableInfo.defaultIds = data.defaultIds
            localStorage.setItem('selectedDisabledRowKeys', data.disableIds)
            // console.log(localStorage.getItem('selectedDisabledRowKeys'))
            selectedRowKeys.value = data.defaultIds
            // Rows.value = data.row
            
            // if(data.hostId > 0){
            //     indexApi.hostsTemplateIds({hostId:data.hostId,templateId:data.templateId}).then((res)=>{
            //         if(res.hostsTemplateIds.length > 0){
            //             // if(myTableInfo.show){
            //             //     selectedRowKeys.value = selectedRowKeys.value 
            //             // }else{
            //             //     selectedRowKeys.value  = res.hostsTemplateIds
            //             // }
            //             selectedRowKeys.value  = res.hostsTemplateIds
            //             // rowSelectionType.disableIds = res.hostsTemplateIds
            //             console.log(res.hostsTemplateIds)
            //             localStorage.setItem('selectedDisabledRowKeys', res.hostsTemplateIds)
            //         }
                    
            //     })
            // }else{
            //     selectedRowKeys.value  = selectedRowKeys.value
            //     localStorage.setItem('selectedDisabledRowKeys',[]) 
            // }
            
            myTableInfo.visible = true
       }
       
       if(data._object.data){
            myTableInfo.localDataSource = data._object.data
            myTableInfo.total = 12
            myTableInfo.loading = false
       }
    //    console.log(data._object.data)
       function refresh(){
        if(data._object.data){
                myTableInfo.localDataSource = data._object.data
                myTableInfo.total = 12
                myTableInfo.loading = false
            }
        }
       function handleOk(){
            // if(selectedRowKeys.value.length === 0){
            //     message.error('请选择')
            //     return false
            // }
            // myTableInfo.show =true
            const ids = selectedRowKeys.value.map((item)=>{
                return item
            })
            // console.log(localStorage.getItem('selectedDisabledRowKeys'))
            emit('handleOk',{Keys:ids,KeysRow:Rows.value})
            myTableInfo.visible = false
        }
        function handleCancel(){
            //rowSelectionType.value.defaultIds = []
            // myTableInfo.show =false
            
            if(rowSelectionType.value.type != 'radio'){
                localStorage.setItem('selectedDisabledRowKeys',[])
                selectedRowKeys.value = []
                Rows.value = []
                // selectedDisabledRowKeys.value = []
            }   
            //selectedRowKeys = []
            // rowSelectionType.value.defaultIds = []
            // console.log(selectedRowKeys.value)
            // console.log(rowSelectionType.value.defaultIds)
            emit('handleCancel')
        }
        function changeSize(page, pageSize){
            //console.log(page)
            //console.log(pageSize)
            emit('changesize',{current:page,size:pageSize})
        }
        function showSizeChange(current, size){
            //console.log(current)
            //console.log(size)
            emit('changesize',{page:current,size:size})
        }
        const rowSelection = {
            selectedRowKeys,
            type:rowSelectionType.value.type,
            preserveSelectedRowKeys:true,
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                // console.log(selectedDisabledRowKeys.value)
                Rows.value = selectedRows
            },
            onSelect: (record, selected) => {
                let changedId = record.id;
                let removeIndex = 0
                selectedRowKeys.value.filter((c,index) => {
                if(c === changedId){
                    removeIndex = index
                }
                })
                if (selected){
                    if(rowSelectionType.value.type == 'radio'){
                        selectedRowKeys.value = []
                    }
                    selectedRowKeys.value.push(changedId);
                } else{
                    selectedRowKeys.value.splice(removeIndex, 1);
                }
                

            },
            onSelectAll: (selected, selectedRows) => {
             
                if(selected){
                    selectedRows.map((elements) => {
                        if(typeof(elements)!='undefined' ){
                        //    console.log(myTableInfo);
                           if(myTableInfo.defaultIds.length > 0){
                            if(myTableInfo.defaultIds.indexOf(elements.id) <= -1){
                                selectedRowKeys.value.push(elements.id)
                            }
                           }else{
                            selectedRowKeys.value.push(elements.id)
                           }
                           
                        }
                    })
                }else{
                    selectedRowKeys.value.splice(0);
                }
                 
            },
            getCheckboxProps: record => ({
                // return {
                    disabled:localStorage.getItem('selectedDisabledRowKeys').includes(record.id),
                    props: {
                        // disabled: record.name === 'Disabled User',disabled: selectedDisabledRowKeys.value.includes(record.id),
                        // name: record.name,
                        defaultChecked: selectedRowKeys.value.includes(record.id) // 该属性用于默认勾选处理
                    },
                // }
            }),
            
        }  
       return {
            onOpen,
            myTableInfo, 
            handleOk,
            handleCancel,
            pagination,
            changeSize,
            showSizeChange,
            rowSelection,
            refresh
        }
    }
})
</script>
<style lang="less" scoped>
.pagination{
    margin-top: 10px;
    text-align: end;
}
</style>