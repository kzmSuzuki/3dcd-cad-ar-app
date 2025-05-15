// アプリケーションの主要な機能を実装するJavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 要素の取得
    const loadingScreen = document.getElementById('loading-screen');
    const instructions = document.getElementById('instructions');
    const closeInstructionsBtn = document.getElementById('close-instructions');
    const toggleModelBtn = document.getElementById('toggle-model');
    const takePhotoBtn = document.getElementById('take-photo');
    
    // ARシーンが読み込まれたらローディング画面を非表示
    const scene = document.querySelector('a-scene');
    scene.addEventListener('loaded', function () {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 1000);
    });

    // カメラアクセスエラー時の処理
    scene.addEventListener('camera-error', function() {
        alert('カメラへのアクセスができませんでした。ブラウザの設定を確認してください。');
    });

    // マーカーが検出されたときの処理
    const marker = document.querySelector('a-marker');
    marker.addEventListener('markerFound', function() {
        console.log('マーカーを検出しました');
        // マーカー検出時に追加のアニメーションなどを実装可能
    });

    // マーカーを見失ったときの処理
    marker.addEventListener('markerLost', function() {
        console.log('マーカーを見失いました');
    });

    // 説明を閉じるボタンの処理
    closeInstructionsBtn.addEventListener('click', function() {
        instructions.classList.add('hidden');
    });

    // 3Dモデルの切り替え用の配列
    const models = [
        { type: 'box', color: 'red', position: '0 0.5 0' },
        { type: 'sphere', color: 'blue', position: '0 0.5 0' },
        { type: 'cylinder', color: 'green', position: '0 0.5 0' },
        { type: 'cone', color: 'yellow', position: '0 0.5 0' }
    ];
    let currentModelIndex = 0;

    // モデル切り替えボタンの処理
    toggleModelBtn.addEventListener('click', function() {
        // 次のモデルインデックスを計算
        currentModelIndex = (currentModelIndex + 1) % models.length;
        const model = models[currentModelIndex];
        
        // マーカーの子要素をすべて削除
        while (marker.firstChild) {
            marker.removeChild(marker.firstChild);
        }
        
        // 新しいモデルを作成して追加
        const newEntity = document.createElement(`a-${model.type}`);
        newEntity.setAttribute('position', model.position);
        newEntity.setAttribute('material', `color: ${model.color}`);
        marker.appendChild(newEntity);
    });

    // 写真撮影ボタンの処理
    takePhotoBtn.addEventListener('click', function() {
        // スクリーンショットを撮る
        const canvas = document.querySelector('canvas');
        const dataURL = canvas.toDataURL('image/png');
        
        // ダウンロードリンクを作成
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'ar-screenshot.png';
        link.click();
        
        // フィードバックを表示
        const feedback = document.createElement('div');
        feedback.textContent = '写真を保存しました！';
        feedback.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); ' +
                                'background-color: rgba(0,0,0,0.7); color: white; padding: 15px; ' +
                                'border-radius: 10px; z-index: 1000;';
        document.body.appendChild(feedback);
        
        // フィードバックを2秒後に消す
        setTimeout(() => {
            document.body.removeChild(feedback);
        }, 2000);
    });

    // オフライン検出
    window.addEventListener('online', function() {
        console.log('オンラインに戻りました');
    });
    
    window.addEventListener('offline', function() {
        console.log('オフラインになりました');
        // オフラインモードの通知を表示するなどの処理を追加可能
    });
});