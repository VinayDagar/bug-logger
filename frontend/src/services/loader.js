import 'nprogress/nprogress.css';
import NProgress from 'nprogress';

export const showLoader = () => {
    const isLoaderHidden = localStorage.getItem("isLoaderHidden");
    
    if (isLoaderHidden) return;
    NProgress.start();
}

export const hideLoader = () => {
    NProgress.done();
}
