const commonjs={

}
import ElementUI from "element-ui";
commonjs.exportToExcel=function(arr){
    if(arr.length==0){
        ElementUI.Message({
            message: '请先选择数据',
            type: 'warning'
        });
    }else{
        require.ensure([], () => {
            const { export_json_to_excel } = require("../../excal/Export2Excel"); //这里必须使用绝对路径，根据自己的命名和路径
            let tHeader=[],data=[]
            for(let key in arr[0]){
                tHeader.push(arr[0][key].name)
            }
            for(let i=0;i<arr.length;i++){
                let temporaryArr=[]
                for(let key in arr[i]){
                    temporaryArr.push(arr[i][key].value)
                }
                data.push(temporaryArr)
            }
            export_json_to_excel(tHeader, data, `电力表格`);
        });
    }
}
export default commonjs