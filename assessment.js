'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子どもを全て削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    while (element.firstChild) { // 子どもの要素があるかぎり削除
      element.removeChild(element.firstChild);
    }
}

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) { // 名前が空の時は処理を終了する
        return;
    }

    // 診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);
    
    // TODO ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
        + encodeURIComponent('あなたのいいところ')
        + '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivided.appendChild(anchor);
    // widgets.js の設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);

};

const answers = [
    '{userName}様のいいところは声です。{userName}様の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}様のいいところはまなざしです。{userName}様に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}様のいいところは情熱です。{userName}様の情熱に周りの人は感化されます。',
    '{userName}様のいいところは厳しさです。{userName}様の厳しさがものごとをいつも成功に導きます。',
    '{userName}様のいいところは知識です。博識な{userName}様を多くの人が頼りにしています。',
    '{userName}様のいいところはユニークさです。{userName}様だけのその特徴が皆を楽しくさせます。',
    '{userName}様のいいところは用心深さです。{userName}様の洞察に、多くの人が助けられます。',
    '{userName}様のいいところは見た目です。内側から溢れ出る{userName}様の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}様のいいところは思いやりです。{userName}様に気をかけてもらった多くの人が感謝しています。',
    '{userName}様のいいところは感受性です。{userName}様が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}様のいいところは節度です。強引すぎない{userName}様の考えに皆が感謝しています。',
    '{userName}様のいいところは好奇心です。新しいことに向かっていく{userName}様の心構えが多くの人に魅力的に映ります。',
    '{userName}様のいいところは気配りです。{userName}様の配慮が多くの人を救っています。',
    '{userName}様のいいところはその全てです。ありのままの{userName}様自身がいいところなのです。',
    '{userName}様のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}様が皆から評価されています。',
    '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
  ];
/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
    // TODO 診断処理を実装する
    return '';
}

function assessment(userName) {
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
      sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }
  
    // 文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];
  
    // TODO {userName} をユーザーの名前に置き換える
    result = result.replace(/\{userName\}/g, userName);
    return result;
}

// テストコード
console.assert(
    assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);

console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
);
