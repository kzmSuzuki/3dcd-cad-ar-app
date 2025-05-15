// アプリケーションの主要な機能を実装するJavaScript

document.addEventListener('DOMContentLoaded', function() {
    // 要素の取得
    const loadingScreen = document.getElementById('loading-screen');
    const instructions = document.getElementById('instructions');
    const closeInstructionsBtn = document.getElementById('close-instructions');
    const toggleModelBtn = document.getElementById('toggle-model');
    
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
        // GLBモデルを追加
        { 
            type: 'entity', 
            position: '0 1 0',
            scale: '0.3 0.3 0.3',
            rotation: '0 0 0',
            model: 'models/BoushiAR.glb' 
        }
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
        if (model.model) {
            // glTFまたはGLBモデルの場合
            const newEntity = document.createElement('a-entity');
            newEntity.setAttribute('position', model.position);
            newEntity.setAttribute('scale', model.scale);
            newEntity.setAttribute('rotation', model.rotation);
            newEntity.setAttribute('gltf-model', model.model);
            marker.appendChild(newEntity);
        } else {
            // プリミティブの場合
            const newEntity = document.createElement(`a-${model.type}`);
            newEntity.setAttribute('position', model.position);
            newEntity.setAttribute('material', `color: ${model.color}`);
            marker.appendChild(newEntity);
        }
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