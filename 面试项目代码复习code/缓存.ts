class DataCache {
    private static instance: DataCache;
    private cache: { [key: string]: any } = {}
    private constructor() {
        this.data  = {};
    };
    public static getInstance(): DataCache {
        if (!DataCache.instance) {
            DataCache.instance = new DataCache();
        }
        return DataCache.instance;
    }
    public setData(key: string, value: any): void {
        this.cache[key] = value;
    }
    public getData(key: string): any {
        return this.cache[key];
    }
    public removeItem(key: string): void {
        delete this.cache[key];
    }
    public clear(): void {
        this.cache = {};
    }
}
const useDataCache = () => {
    const cache =  DataCache.getInstance();
    const [_,forceUpdate] = useState({});
    useEffect(()=>{

    },[]);
    const setCacheItem = (key:string,value:any)=>{
        cache.setData(key,value);
        forceUpdate({});
    }
    const getCacheItem = (key:string)=>{
        return cache.getData(key);
    }
    const removeCacheItem = (key:string)=>{
        cache.removeItem(key);
        forceUpdate({});
    };
    const clearPageCache=()=>{
        cache.clear();
        forceUpdate({});
    };
    const cacheHashMore = (key:string)=> {
        return getCacheItem(key)?.['hasMore'];
    }
    const cacheListMore = (key:string,data:any)=>{
       return getCacheItem(key)?.['pageSize']; 
    }
    const cacheData=(key:string,data:any)=>{
        const cacheData = getCacheItem(key)?.['pageData']; 
    }
    return {setCacheItem,getCacheItem,removeCacheItem,clearPageCache}
}