/* Javascript for Web3dXBlock. */
function Web3dXBlock(runtime, element) {

    var container;

    var camera, scene, renderer;
    var controls;

    var width = 750;
    var height = 500;

    function animate() {

        requestAnimationFrame(animate);
        render();
        controls.update();

    }

    function render() {

        renderer.render(scene, camera);

    }


    $(function ($) {

        container = $(".container", element);

        camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
        camera.position.z = 100;

        // scene

        scene = new THREE.Scene();

        var ambient = new THREE.AmbientLight(0x444444);
        scene.add(ambient);

        var directionalLight = new THREE.DirectionalLight(0xffeedd);
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);

        var directionalLight2 = new THREE.DirectionalLight(0xffeedd, 0.5);
        directionalLight2.position.set(-1, 1, 1).normalize();
        scene.add(directionalLight2);

        // model

        var onProgress = function (xhr) {};

        var onError = function (xhr) {};


        THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());

        var loader = new THREE.OBJMTLLoader();
        loader.load(container.data('obj'), container.data('mtl'), function (object) {

            object.position.y = -40;
            scene.add(object);

        }, onProgress, onError);

        // render

        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        container.append(renderer.domElement);

        // controls

        controls = new THREE.TrackballControls( camera, renderer.domElement );
        controls.rotateSpeed = 5;
        controls.minDistance = 5;
        controls.maxDistance = 200;
        controls.addEventListener( 'change', render );

        animate();
    });
}
