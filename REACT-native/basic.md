# jsx语法
# 组件，分类，传参，属性和状态
# 生命周期
# Hook API
# Redux
没有继承性，rn当中的继承只发生在text组件上
样式名，采用小驼峰的命名
fontSize VSfont-size
所有的尺寸都是没有单位的width:100 
有些特殊的样式名：marginHorizaontal水平外边距和marginVertical垂直外边距
通过style属性直接声明
属性值为对象<组件 style = {{样式}}/>
里面是js对象，两层大括号的
属性值为数组《组件 style={[{样式1},{样式2}]}
在style属性当中调用stylesheet声明的样式
引入:import {StyleSheet,View } from 'react-native'
声明: const styles=StyleSheet.create({foo:{样式1}   ,bar:{样式2}})
使用:view style={[styles.foo,styles.bar]}内容</view>
export default class App extends Component {
    render() {
        return (
            <view style={{
                marginHorizontal:20,
                backgroundCOlor:'#dfb'
            }}
            >
            <Text style={[styles.red.styles.fontLarge]}>Hello Rn</Text>
            </view>

        )
    }
}
//index.js
import {AppRegistry} from 'react-native';
//注册appde1.
import App from './App';
import {name as appName} from './app.json';
console.log('Hello React native');
AppRegistry.registerComponent(appName, () => App);
//注册组件的,先调用index。js再调用app.js
/App.init.js重命名为了保留一份的
App.js
快捷命令的
rnc 
rn当中声明尺寸不需要带单位的
//传递了多个属性对象的话，后写的优先级会比较高的
export default class App extends Component {
    render() {
        return (
            <view>
            <Text style={{fontSize:30;}}>text incomponet</Text>
            <Text style={[{color:'red'}]}>Text InComponent</Text>
            <Text style={{fontSize:30px;}}>text incomponet</Text>
            <Text style = {[styles.h1]}>Hlelo RN</Text>
            </view>
        )
    }
}
const styles= StyleSheet.create({
    h1: {
        //模拟h1i标签
        //主轴main axios,交叉轴cross axes
        //web的弹性布局和rn端的弹性布局时不一样的 
        fontSize:40,
        fontWeight:'bold'
    },
    h2 : {
        fontSize:30,
        fontWeight:'bold'

    }
    //main sizee,main-end,cross-start,crooss-end
    rn当中主轴方向发生了变更，
    rn当中主轴方向是垂直方向的，交叉轴的开始和结束位置发生了变化
    flexDirection声明主轴的方向,row,web默认的，columnrn默认的
    justifyContent:声明项目在主轴上的对其方式
    align-items声明项目在交叉轴上的对其方式
    flex声明项目在主轴上的尺寸比例
    //src+02flexbox创建一个flex-diection
})
//rnce
export default class FlexDirection extends Component {
    render() {
        return (
            <view>
            <View>
            <Text >flexDirection:'column'(默认)</Text>
            <View>
            //当作容器来使用的
            <Text>刘备</Text>
            <Text>关于</Text>
            <Text>张飞</Text>
            </View>
            </View>
            <Text > textInComponent</Text>
            </view>
        )
    }
}
const styles = StyleSheet.create({})
//验证主轴方向