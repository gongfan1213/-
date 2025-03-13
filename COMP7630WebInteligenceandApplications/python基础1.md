COMP7630 - 网络智能及其应用
COMP7630 – Web Intelligence and its Applications

Python复习
Revision of Python

大纲
Outline
- 完整的Python环境
  - A full Python environment
- Python基础
  - Python 101

Miniconda
- Miniconda是最受欢迎的Python发行平台之一。
  - MiniConda is one of the most popular Python distribution platform.
- 它是Anaconda的轻量级版本。
  - It is a lightweight version of Anaconda.
- 文档和下载链接可在https://docs.conda.io/projects/miniconda/en/latest/获取。
  - Documentation and download links are available at https://docs.conda.io/projects/miniconda/en/latest/.
安装完成后……
Once installed …
在基础环境中启动命令提示符。
Launch prompt inside the base environment.
Miniconda3（64位）
Miniconda3 (64-bit)
环境之间相互隔离，便于管理Python包。
Environments are sand-boxed among them and ease the management of Python packages.
Anaconda Powershell提示符（Miniconda3）
Anaconda Powershell Prompt (Miniconda3)
我建议创建webintelligence环境：
  - conda create -n webintelligence
  - conda activate webintelligence
  - conda install python==3.11.5
I suggest to create the webintelligence environment: 
  - conda create -n webintelligence
  - conda activate webintelligence
  - conda install python==3.11.5
Anaconda提示符（Miniconda3）
Anaconda Prompt (Miniconda3)
安装Jupyter和Spyder可能也会有用：
  - conda install jupyter spyder
It may be useful to install also Jupyter and Spyder: 
  - conda install jupyter spyder
Anaconda3（64位）
Anaconda3 (64-bit)
请安装pip，即Python包安装器：
  - conda install pip
  - conda config --set pip_interop_enabled True
Please install pip, the Python packages' installer: 
  - conda install pip
  - conda config --set pip_interop_enabled True
Jupyter Notebook Jupyter Notebook（webintelligence）
Jupyter Notebook Jupyter Notebook (webintelligence)
请安装ipython，即改进版的Python交互式Shell：
  - pip install ipython
Please install ipython, the Improved Python interactive shell 
  - pip install ipython
Orange数据挖掘（orange）
Orange Data Mining (orange)
请安装一些我们稍后会用到的Python包：
  - pip install numpy matplotlib seaborn pandas scipy scikit-learn spacy nltk nevergrad mlxtend beautifulsoup4
Please install some Python packages we will use later on 
  - pip install numpy matplotlib seaborn pandas scipy scikit-learn spacy nltk nevergrad mlxtend beautifulsoup4
重置Spyder设置 重置Spyder设置（webintelligence）Spyder Spyder（ebinteligence）
Reset Spyder Settings Reset Spyder Settings (webintelligence) Spyder Spyder (ebinteligence)
如果需要，我们将使用pip install <package_name>安装其他Python包。
If required, we will install additional Python packages by using pip install <package_name>.
安装完成后……
Once installed …
Anaconda3（64位）
Anaconda3(64-bit)
Jupyter Notebook
它会启动一个本地Web应用程序，然后在浏览器中打开该Web应用程序。
It launches a local web application, then it opens your browser pointing at that web application.
Jupyter Notebook（webintelligence）
Jupyter Notebook (webintelligence)
Orange数据挖掘（orange）
启动并打开Jupyter Notebook很有用。
It is useful to launch and open Jupyter Notebook.
重置Spyder设置
Reset Spyder Settings
重置Spyder设置（webintelligence）
Reset Spyder Settings (webintelligence)
K Spyder
K Spyder(webintligence)
安装完成后……
Once installed …
Anaconda3（64位）
Anaconda3 (64-bit)
Jupyter Notebook Jupyter Notebook（webintelligence）
Orange数据挖掘（orange）
这是一个广为人知的Python编辑器。你可以自由使用它，但有时我可能更倾向于使用Notepad++和用于运行“ipython”的Shell，或者直接使用“python”解释器。
This is a well known editor for Python. You are free to use it, but sometime I may prefer Notepad++ & a shell for running "ipython" or directly the "python" interpreter.
重置Spyder设置
Reset Spyder Settings
重置Spyder设置（webintelligence）
Reset Spyder Settings (webintelligence)
Notepad++可从https://notepad-plus-plus.org/downloads/下载。
Notepad++ can be downloaded from https://notepad-plus-plus.org/downloads/.
Spyder
Spyder (webintelligence)

Hello World
- 创建一个名为helloworld.py的文件。
  - Create a file named helloworld.py.
- 在helloworld.py中编写以下Python语句：
  - print('Hello World')
  - Write the following Python statement inside helloworld.py
  - print('Hello World')
- 打开Miniconda Shell（如果你决定使用“webintelligence”环境，请先激活它），并使用以下命令：
  - cd <directory_where_you_saved_helloworld.py>
  - python helloworld.py
  - Open the Miniconda shell (activate the "webintelligence" environment if you decided to use it) and use the following commands:
  - cd <directory_where_you_saved_helloworld.py>
  - python helloworld.py
- 如果你看到“Hello World”这句话，说明你的Miniconda/Python安装成功了！
  - If you see the phrase "Hello World", your Miniconda/Python installation is working!
- 你也可以尝试启动ipython并输入1+1，你应该会看到结果2。
  - You may also try to launch ipython and write 1+1, you should see 2.

大纲
Outline
- 完整的Python环境
  - A full Python environment
- Python基础
  - Python 101

基本变量和数据结构
Basic variables and data structure
- 与其他编程语言不同，Python在声明变量时不需要指定数据类型。
  - Different from other programming languages, Python does not need to specify the data type while declaring the variable.
- 它可以通过不同的声明方式自动识别数据类型。
  - It can automatically identify the data type by different declaring method.
- Python有五种标准数据类型：
  - 数字
  - 字符串
  - 列表
  - 元组
  - 字典
  - Python has five standard data types:
  - Numbers
  - String
  - List
  - Tuple
  - Dictionary

Python中的数字
Numbers in Python
- 3种不同的数值类型：
  - 整数（有符号整数）
  - 浮点数（浮点实数值）
  - 复数
  - 3 different numerical types:
  - int (signed integers)
  - float (floating point real values)
  - complex (complex numbers)
- operator type可以获取任何变量的类型
  - The operator type gives you the type of any variable
In[12]:a = 46
In [13]:type(a)
Out[13]:int
In[14]:b = 3.14
In[15]:type(b)
Out[15]:float
In [16]:c = 1.2 + 3.4j
In [17]:type(c)
Out[17]:complex

Python中的字符串
Strings in Python
- 字符串是用引号（单引号和双引号都可以）括起来的连续字符序列。
  - Strings are contiguous sequence of characters inside quotation marks (both single and double quotes are ok).
- 你可以使用切片操作符（[ ]和[ : ]）和索引来获取字符串的子序列，索引从0开始表示字符串开头，从 -1开始表示字符串末尾。
  - You can get the subsequence of the strings by using slice operator ([ ] and [ : ]) with indexes, 0 from the beginning and -1 from the end of string.
In [55]:s = 'Today is a very beautiful day!'
Out[56]:30
In[56]:Len(s)
In [57]:s[0]
Out[57]:'T'
In[58]:s[-1]
Out[58]:'!'
In[59]:s[0:5]
Out[59]:'Today'
In[60]:s[:5]
Out [60]:'Today'
In[61]:s[-4:]
Out [61]:'day!'

Python中的列表
Lists in Python
- Python中的“列表”是一个可以存储多个数据项和不同数据类型的变量。
  - Python “list” is a variable that can store multiple items and types of data.
- 数据按顺序存储在列表“元素”中。
  - The data is stored sequentially in list “elements”.
- 列表可以有多个索引，以表示多个维度。
  - Lists can have more than one index – to represent multiple dimensions.
In[45]:month_List = ['Jan', 'Feb', 'Mar']
In[46]:month_List[0]
out [46]:'Jan'
In[47]:month_List[-1]
Out [47]:'Mar'
In [48]:month_List[1:3]
Out[48]:['Feb', 'Mar']
In [49]:Len(month_List)
Out[49]:3
In [50]:day_List = [['Mon', 31], ['Tue', 28], ['Fri', 31]]
In [51]:day_List[1]
Out[51]:['Tue', 28]
In [52]:day_List[1][0]
Out[52]:'Tue'
In [53]:day_List[1][1]
Out[53]:28

Python中的元组
Tuples in Python
元组的性质与列表类似，但这两种结构的主要区别在于：
The nature of tuple is similar to list, but the main differences between these two structures are:
- 列表的大小和元素都可以修改，而元组不能被更新。
  - list allowed modification for both size and elements, tuple cannot be updated.
- 列表用方括号[ ]括起来，元组用圆括号( )括起来。
  - list is enclosed by brackets [ ], tuple is enclosed by parentheses ( ).
In[63]:month_List = ['Jan', 'Feb', "Mar']
In[64]:month_tuple = ('Jan', 'Feb', 'Mar')
In[65]:month_List.append('May')
In[66]:month_List[-1] = 'Apr'
In[67]:month_List
Out[67]:['Jan', 'Feb', 'Mar', 'Apr']
In[68]:month_tuple.append('Apr')
AttributeError <ipython-input-68-5c4993d27f62>in <module> Traceback (most recent call last)
>1 month_tuple.append('Apr')
AttributeError: 'tuple' object has no attribute 'append'
In [69]:month_tuple[1]
Out[69]:'Feb'
In[70]:month_tuple[1] = 'Test'
TypeError Traceback (most recent call last)
<ipython-input-70-eee707564305>in <module>
>1month_tuple[1] = 'Test'
TypeError: 'tuple' object does not support item assignment

Python中的字典
Dictionaries in Python
- Python中的字典是一个数据容器，它可以将多个数据项存储为键值对列表。
  - A Python's dictionary is a data container that can store multiple items of data as a list of key:value pairs.
- 与普通列表容器的值通过索引编号引用不同，字典中存储的值通过其关联的键来引用。
  - Unlike regular list container values, which are referenced by their index numbers, values stored in dictionaries are referenced by their associated key.
- 键在字典中必须是唯一的，通常是字符串名称，不过也可以使用数字。
  - The key must be unique within that dictionary and is typically a string name although numbers may be used.
In[79]: month_dict = {'Jan': {'starting': 'Sun', 'Days': 31}, 'Feb': {'starting': 'Wed', 'Days': 28}, 'Mar': {'starting': 'Wed', 'Days': 31}}
In [80]:month_dict['Feb']
out[80]: {'starting': 'Wed', 'Days': 28}
In[81]:month_dict['Feb']['Days']
Out[81]:28
In[82]:month_dict.keys()
out[82]:dict_keys(['Jan', 'Feb', 'Mar'])
In[83]:"Mar' in month_dict
Out [83]:True
In[84]:'Apr' in month_dict
Out[84]:False
In[85]:month_dict['Apr'] = {'starting': 'Sat', 'Days': 30}
In[86]:month_dict
Out[86]:
{'Jan': {'Starting': 'Sun', 'Days': 31}, 'Feb': {'Starting': 'Wed', 'Days': 28}, 'Mar': {'starting': 'Wed', 'Days': 31}, 'Apr': {'Starting': 'Sat', 'Days': 30}}
In[87]:Len(month_dict)
Out [87]:4

if、else、elif
- 在Python中，定义类、函数或进行流程控制时不使用花括号。
  - In Python, braces are not used when defining classes, function, or flow control.
- 相反，使用行缩进表示代码块。
  - Instead, line indentation is used for denoting blocks of code.
In[89]:a = 10
In [90]:if a > 5:
print(f'{a} is greater than 5')
10is greater than 5
In[91]:b = 1_000
In[92]:if 2_000 < b < 3_000:
print(f'{b} is between 2000 and 3000')
else:
print(f'{b} is NOT between 2000 and 3000')
1000is NOT between 2000and3000
In[93]:c = 3
In[94]:if c == 1:
print('The value of the variable is 1')
elif c == 2:
print('The value of the variable is 2')
else:
print('The value of the variable is neither 1 nor 2')
The value of the variable is neither 1nor 2

for和while
In [103]: for i in range(5):
print(f'The value of "i"is {i}')
The value of "i" is0
The value of "i" is1
The value of "i" is2
The value of "i" is3
The value of "i" is4
In[104]:for m in month_List:
print(m)
Jan
Feb
Mar
Apr
In[105]:s = 'Today is a beatiful day'
In[106]:for w in s.split(' '):
print(w)
Today
is
a
beatiful
day
In[114]:i = 1
In[115]:while i <= 5:
print(f'The value of "i" is {i}')
i += 1
The value of "i" is1
The value of "i" is2
The value of "i" is3
The value of "i" is4
The value of "i" is5
In[116]:i = 6
In [117]:while i < len(month_List):
print(month_List[i])
i = i + 1
Jan
Feb
Mar
Apr

break和continue
In[122]:flag, i = True, 0
In [123]:while flag:
if month_List[i] == 'Mar':
flag = False
else:
i += 1
print(month_List[i])
Jan
Feb
In[124]:i = 0
In[125]:while i < len(month_List):
print(month_List[i])
i += 1
if i >= 2:
break
Jan
Feb
In[134]:consonants = []
In [135]:for Letter in 'Hong Kong is beautiful':
if letter in ['a', 'e', 'i', 'o', 'u']:
continue
consonants.append(Letter)
In[136]:consonants
out[136]:['H', 'n', 'g', 'K', 'n', 'g', 's', 'b', 't', 'f', 'l']
In[137]:consonants = set(consonants)
In [138]:consonants
out[138]:{'H', 'K', 'b', 'f', 'g', 'l', 'n', 's', 't'}

综合表达式
Comprehensive expressions
- 使得可以使用类似数学符号的表示法构建列表/元组/字典。
  - Make possible to build lists/tuples/dictionaries by using an almost mathematical notation.
In[15]:sentence = 'Hong Kong is beautiful
