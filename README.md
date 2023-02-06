# lesson_typescript

## nodeをインストールしたのにnomが使えない...
ターミナル再起動したら直った  
https://nabelog.org/471/


## tsc index.tsが実行できない...
npx tsc index.tsに変えたら実行できた（新しくなってコマンドが変わった？）  
https://maku.blog/p/ak7u3h3/


## npx tsc index.tsを実行したらindex.jsが生成された
TypeScriptはJavaScriptにコンパイルされるので.tsファイルが.jsファイルに変換されたものが生成される。  
なのでコンパイル後であれば、.tsファイルでエラーが起きていても実行できる。

## pushできなくなった
https://zenn.dev/yuri0427/articles/9587ae6a578ee9

## 一度に複数のtsファイルをコンパイルする
tsconfig.jsonのoutDirとrootDirを設定し、rootDirににtsファイルを置く。  
npx tscを実行すると、outDirに設定したディレクトリにコンパイルされたjsファイルが出力される。

## insertAdjacentElementについて
参考記事  
https://cly7796.net/blog/javascript/insert-elements-with-javascript/

## tsconfig.jsonを変更したのに反映されない...
コンパイルすると  
```Property 'includes' does not exist on type 'string'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2015' or later.```  
が発生する。  
原因はコンパイル時にファイル名を指定してたから  

参考記事  
https://qiita.com/RyosukeSomeya/items/3ef53eb42b890f419472
