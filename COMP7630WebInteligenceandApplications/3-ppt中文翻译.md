# COMP7630 - 网络智能及其应用
COMP7630 – Web Intelligence and its Applications
## Python环境
Python Environment
（我将在Python相关主题中使用此环境）
(I will use for Python-related topics)
瓦伦蒂诺·桑图奇
Valentino Santucci
(valentino.santucci@unistrapg.it)
### Miniconda
- Miniconda是最受欢迎的Python发行平台之一。
MiniConda is one of the most popular Python distribution platform
- 它是Anaconda的轻量级版本。
It is a lightweigth version of Anaconda
- 其文档和下载链接可在以下网址获取：https://docs.conda.io/projects/miniconda/en/latest/
Documentation and download links are available at https://docs.conda.io/projects/miniconda/en/latest/
安装完成后……
Once installed …
在基础环境中启动命令提示符。
Launch prompt inside the base environment.
Miniconda3（64位）
Miniconda3 (64-bit)
环境之间相互隔离，便于管理Python包。
Environments are sand-boxed among them and ease the management of Python packages.
Anaconda Powershell命令提示符（Miniconda3）
Anaconda Powershell Prompt (Miniconda3)
我建议创建名为webintelligence的环境，执行以下命令：
I suggest to create the webintelligence environment:
```bash
conda create -n webintelligence
conda activate webintelligence
conda install python==3.11.5
```
Anaconda命令提示符（Miniconda3）
Anaconda Prompt (Miniconda3)
安装Jupyter和Spyder也可能会有用，执行以下命令：
It may be useful to install also Jupyter and Spyder:
```bash
conda install jupyter spyder
```
Anaconda3（64位）
Anaconda3 (64-bit)
请安装pip（Python包的安装工具），执行以下命令：
Please install pip, the Python packages' installer:
```bash
conda install pip
conda config --set pip_interop_enabled True
```
Jupyter Notebook（webintelligence环境）
Jupyter Notebook Jupyter Notebook (webintelligence)
请安装ipython（改进的Python交互式命令行），执行以下命令：
Please install ipython, the Improved Python interactive shell
```bash
pip install ipython
```
Orange数据挖掘（orange）
Orange Data Mining (orange)
请安装一些我们稍后会用到的Python包，执行以下命令：
Please install some Python packages we will use later on
```bash
pip install numpy matplotlib seaborn pandas scipy scikit-learn spacy nltk nevergrad mlxtend beautifulsoup4
```
重置Spyder设置（webintelligence环境）
Reset Spyder Settings Reset Spyder Settings (webintelligence)
Spyder（webintelligence环境）
Spyder Spyder (ebinteligence)
如果有需要，我们将使用`pip install <package_name>`命令安装其他Python包。
If required, we will install additional Python packages by using pip install <package_name>
安装完成后……
Once installed …
Anaconda3（64位）
Anaconda3(64-bit)
### Jupyter Notebook
它会启动一个本地Web应用程序，然后在浏览器中打开该应用程序。
It launches a local web application, then it opens your browser pointing at that web application.
Jupyter Notebook（webintelligence环境）
Jupyter Notebook (webintelligence)
Orange数据挖掘（orange）
Orange Data Mining (orange)
它对于启动和打开Jupyter Notebook很有用。
It is useful to launch and open Jupyter Notebook
重置Spyder设置
Reset Spyder Settings
重置Spyder设置（webintelligence环境）
Reset Spyder Settings (webinteligence)
Spyder
Spyder
Spyder（webintelligence环境）
Spyder(webintligence)
安装完成后……
Once installed …
Anaconda3（64位）
Anaconda3 (64-bit)
Jupyter Notebook
Jupyter Notebook
Jupyter Notebook（webintelligence环境）
Jupyter Notebook (webintelligence)
Orange数据挖掘（orange）
Orange Data Mining (orange)
这是一个广为人知的Python编辑器。你可以自由使用它，但有时我可能更倾向于使用Notepad++和用于运行“ipython”的命令行，或者直接使用“python”解释器。
This is a well known editor for Python. You are free to use it, but sometime I may prefer Notepad++ & a shell for running "ipython" or directly the "python" interpreter.
Notepad++可从https://notepad-plus-plus.org/downloads/下载。
Notepad++ can be downloaded from https://notepad-plus-plus.org/downloads/
Spyder
Spyder
Spyder（webintelligence环境）
Spyder (webintelligence)
### Hello World
- 创建一个名为helloworld.py的文件。
Create a file named helloworld.py
- 在helloworld.py中写入以下Python语句：
Write the following Python statement inside helloworld.py
```python
print('Hello World')
```
- 打开Miniconda命令行（如果你决定使用“webintelligence”环境，请先激活它），并使用以下命令：
Open the Miniconda shell (activate the "webintelligence" environment if you decided to use it) and use the following commands:
```bash
cd <directory_where_you_saved_helloworld.py>
python helloworld.py
```
- 如果你看到“Hello World”这句话，说明你的Miniconda/Python安装成功了！
If you see the phrase "Hello World", your Miniconda/Python installation is working!
- 你也可以尝试启动ipython并输入1 + 1，你应该会看到结果2。
You may also try to launch ipython and write 1+1, you should see 2 
