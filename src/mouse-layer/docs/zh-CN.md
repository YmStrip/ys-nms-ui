# 基本使用
```html
<MouseLayer
	style="width: 100px;height: 100px;border: 1px solid black"
>
</MouseLayer>
```


```vue
import BasicUse from "../example/BasicUse.vue"
```


### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `size` | 鼠标宽度默认样式 | _number_ | `10` |

### 插槽
| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 内容 | |
| `cursor` | 鼠标样式 | `size:宽度`<br>`[tag]?事件标签` |

### slot可发送的事件
| 名称 | 说明 | 参数 |
| --- | --- | --- |
| `set:tag` | 设置标签 | name:string,data:any |
| `del:tag` | 禁用标签 | name:string |