
import React from 'react';
import Loadable from 'react-loadable';
import Stores from './../stores/userinfo';
import routerStore from './../stores/routerStore';
import CssTransition from './../components/Transition';
import { permissionsVerify } from './../api/login';
const router = {
	indexVerify: () => Loadable({
		loader: () =>{
			debugger
			permissionsVerify().then(res=>{
				if(res.visit == 0){
					return import('./../views/home/home')
				}
				return import('./../views/login')
			})
		},
		render(loaded, props) {
			routerStore.SETROUTER(props.match.path);
			const Component = loaded.default;
			return <Component {...props} userStore={Stores} />;
		},
		loading() {
			return <div className="g-body"></div>;
		}
	}),
	EducationInfoDetails: () => Loadable({
		loader: () => import('../views/educationInfo/item/educationInfoDetails'),
		render(loaded, props) {
			routerStore.SETROUTER(props.match.path);
			const Component = loaded.default;
			return <Component {...props} userStore={Stores} />;
		},
		loading() {
			return <div className="g-body"></div>;
		}
	}),
	EducationInfo: () => Loadable({
		loader: () => import('../views/educationInfo'),
		render(loaded, props) {
			routerStore.SETROUTER(props.match.path);
			const Component = loaded.default;
			return <Component {...props} userStore={Stores} />;
		},
		loading() {
			return <div className="g-body"></div>;
		}
	}),
	MicroCurriculum: () => Loadable({
		loader: () => import('./../views/microCurriculum'),
		render(loaded, props) {
			routerStore.SETROUTER(props.match.path);
			const Component = loaded.default;
			return <Component {...props} userStore={Stores} />;
		},
		loading() {
			return <div className="g-body"></div>;
		}
	}),
	PingtaiHome: () => Loadable({
		loader: () => import('./../views/pingtaiHome'),
		render(loaded, props) {
			routerStore.SETROUTER(props.match.path);
			const Component = loaded.default;
			return <Component {...props} userStore={Stores} />;
		},
		loading() {
			return <div className="g-body"></div>;
		}
	}),
	Search: () => Loadable({
		loader: () => import('./../views/search'),
		render(loaded, props) {
			routerStore.SETROUTER(props.match.path);
			const Component = loaded.default;
			return <Component {...props} userStore={Stores} />;
		},
		loading() {
			return <div className="g-body"></div>;
		}
	}),
	curriculumCenter: () => Loadable({
		loader: () => import('./../views/curriculumCenter'),
		render(loaded, props) {
			routerStore.SETROUTER(props.match.path);
			const Component = loaded.default;
			return <Component {...props} userStore={Stores} />;
		},
		loading() {
			return <div className="g-body"></div>;
		}
	}),
	curriculumlist: () => Loadable({
		loader: () => import('./../views/personal/items/teacherTableData'),
		render(loaded, props) {
			routerStore.SETROUTER(props.match.path);
			const Component = loaded.default;
			return <Component {...props} userStore={Stores} />;
		},
		loading() {
			return <div className="g-body"></div>;
		}
	}),
	Personal: () => Loadable({
		loader: () => import('./../views/personal/index'),
		render(loaded, props) {
			routerStore.SETROUTER(props.match.path);
			const Component = loaded.default;
			return <Component {...props} userStore={Stores} />;
		},
		loading() {
			return <div className="g-body"></div>;
		}
	}),
	teacherCenter: () => Loadable({
		loader: () => import('./../views/teacherPageHome'),
		render(loaded, props) {
			routerStore.SETROUTER(props.match.path);
			const Component = loaded.default;
			return <Component {...props} userStore={Stores} />;
		},
		loading() {
			return <div className="g-body"></div>;
		}
	}),
	Home: () => Loadable({
		loader: () => import('./../views/home/home'),
		render(loaded, props) {
			routerStore.SETROUTER(props.match.path);
			const Component = loaded.default;
			return <Component {...props} userStore={Stores} />;
		},
		loading() {
			return <div className="g-body"></div>;
		}
	}),
	VideoPlayer: () => Loadable({
		loader: () => import('../views/videoPlayer/videoDetails'),
		render(loaded, props) {
			routerStore.SETROUTER(props.match.path);
			const Component = loaded.default;
			return <Component {...props} userStore={Stores} />;
		},
		loading() {
			return <div className="g-body"></div>;
		}
	}),
	Login: () => Loadable({
		loader: () => import('./../views/login'),
		render(loaded, props) {
			sessionStorage.clear();
			routerStore.SETROUTER(props.match.path);
			const Component = loaded.default;
			return <Component {...props} userStore={Stores} />;
		},
		loading() {
			return <div className="g-body"></div>;
		}
	}),
	Data: () => Loadable({
		loader: () => import('./../views/personal/items/personalData'),
		render(loaded, props) {
			routerStore.SETROUTER(props.match.path);
			const Component = loaded.default;
			return <Component {...props} userStore={Stores} />;
		},
		loading() {
			return <div className="g-body"></div>;
		}
	}),
	Live: () => Loadable({
		loader: () => import('./../views/liveVideo/live'),
		render(loaded, props) {
			routerStore.SETROUTER(props.match.path);
			const Component = loaded.default;
			return <Component {...props} userStore={Stores} />;
		},
		loading() {
			return <div className="g-body"></div>;
		}
	}),
	liveVideo: () => Loadable({
		// loader: () => import('../views/videoPlayer/liveVideoPlayer'),
		loader: () => import('../views/videoPlayer/flashLive'),
		render(loaded, props) {
			routerStore.SETROUTER(props.match.path);
			const Component = loaded.default;
			return <Component {...props} userStore={Stores} />;
		},
		loading() {
			return <div className="g-body"></div>;
		}
	}),
};
export default router;
