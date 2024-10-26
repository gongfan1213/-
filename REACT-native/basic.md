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
            <Text style={[styles.h3]}>flexDirection:'column'(默认)</Text>
            <View style = {[styles.container]}>
            //当作容器来使用的
                    <Text style = {[styles.itemBase]}>刘备</Text>
                    <Text style = {[styles.itemBase]}>关于</Text>
                    <Text style = {[styles.itemBase]}> 张飞</Text>
            </View>
             <View style = {[styles.container,styles.flexColumnReverse]}>
            //当作容器来使用的
                    <Text style = {[styles.itemBase]}>刘备</Text>
                    <Text style = {[styles.itemBase]}>关于</Text>
                    <Text style = {[styles.itemBase]}> 张飞</Text>
            </View>
            </View>
            <Text > textInComponent</Text>
            <View styke={[]></View>}
            //scrollview可以滚动来使用的
            </view>
        )
    }
}
const styles = StyleSheet.create({})
//验证主轴方向
const styles = StyleSheet.create( {
    container: {
        height:150,
        margin:10,
        borderWidth:1,
        borderColor:'#dddd'

    },
    h3: {
        fontSize:24,
        marginHorizontal:10,

    },
    h2:{

    },
    itemBase: {
        height:
        borderWidth:1;
        borderColor:'red';
        backgroudnColor:'#dfd';
        padding:4;
        textAlign:'center'
    },
    flexColumn: {
        flexDirection:'column'
    },
    flexColumnReverse: {
        flexDirection: 'idrx'
    },
    flexRow: {
        flexDirection:'',
    },
    flexRowReverse: {
        flexDirection:'row-reverse'
    }
})
import Index from './src_02_FlexBox'
export default class App extends Component }
render() {
    return (
        <Index/>
    )
}
//rn当中的核心的组件是对原生组件的封装
原生组件：Android或者ios内的组件
核心组件;Rn当中最常用的，来在react-native当中的组件
react-native image->imageView
UIImageView
image组件,imageView,UIImageView
TextView->text->UITextView
ActivityIndicator加载指示器组件
View视图组件Text文本组件Alert警告框组件,Button按钮组件Switch开关组件,StatusBar状态栏组件
核心组件
image图片组件
textInput输入框组件
Touchable触碰组件一共三个
Touchable,scrollView滚动视图组件
sectionList分组列表组件
flatlist高性能列表组件
animated动画组件