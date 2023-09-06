### 基本使用
```html
<yn-parallax-layer
	:padding-x="0"
	:padding-y="0"
	fixed
	style="border: 2px solid"
>
	HHH
</yn-parallax-layer>
```

```vue
import BasicUse from '../example/BasicUse'
```

### 属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `speed` | speed | _number_ | `30` |
| `paddingX` | X | _number_ | `10` |
| `paddingY` | Y | _number_ | `10` |
| `width` | 长 | _number_ | `100` |
| `height` | 高 | _number_ | `100` |
| `fixed` | 固定内容 | _boolean_ | `false` |
| `back` | 背景图片路径 | _string_ | `./back.png` |

### 插槽

| 插槽名 | 说明 | 参数 |
| --- | --- | --- |
| `default` | 内容 | `width:number 内容宽`<br>`height:number 内容高` |