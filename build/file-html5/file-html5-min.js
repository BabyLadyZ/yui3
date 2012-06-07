YUI.add("file-html5",function(e){var c=e.Lang,d=e.bind,b=e.config.win;var a=function(g){var f=null;if(a.isValidFile(g)){f=g;}else{if(a.isValidFile(g.file)){f=g.file;}else{f=false;}}a.superclass.constructor.apply(this,arguments);if(f&&a.canUpload()){if(!this.get("file")){this._set("file",f);}if(!this.get("name")){this._set("name",f.name||f.fileName);}if(this.get("size")!=(f.size||f.fileSize)){this._set("size",f.size||f.fileSize);}if(!this.get("type")){this._set("type",f.type);}if(f.hasOwnProperty("lastModifiedDate")&&!this.get("dateModified")){this._set("dateModified",f.lastModifiedDate);}}};e.extend(a,e.Base,{initializer:function(f){if(!this.get("id")){this._set("id",e.guid("file"));}},_uploadEventHandler:function(g){var i=this.get("xhr");switch(g.type){case"progress":this.fire("uploadprogress",{originEvent:g,bytesLoaded:g.loaded,bytesTotal:this.get("size"),percentLoaded:Math.min(100,Math.round(10000*g.loaded/this.get("size"))/100)});this._set("bytesUploaded",g.loaded);break;case"load":if(i.status>=200&&i.status<=299){this.fire("uploadcomplete",{originEvent:g,data:g.target.responseText});var h=i.upload,f=this.get("boundEventHandler");h.removeEventListener("progress",f);h.removeEventListener("error",f);h.removeEventListener("abort",f);i.removeEventListener("load",f);i.removeEventListener("error",f);i.removeEventListener("readystatechange",f);this._set("xhr",null);}else{this.fire("uploaderror",{});}break;case"error":this.fire("uploaderror",{originEvent:g,status:i.status,statusText:i.statusText});break;case"abort":this.fire("uploadcancel",{originEvent:g});break;case"readystatechange":this.fire("readystatechange",{readyState:g.target.readyState,originEvent:g});break;}},startUpload:function(g,m,j){this._set("bytesUploaded",0);try{this._set("xhr",new XMLHttpRequest());this._set("boundEventHandler",d(this._uploadEventHandler,this));var f=new FormData(),i=j||"Filedata",n=this.get("xhr"),h=this.get("xhr").upload,l=this.get("boundEventHandler");e.each(m,function(p,o){f.append(o,p);});f.append(i,this.get("file"));n.addEventListener("loadstart",l,false);h.addEventListener("progress",l,false);n.addEventListener("load",l,false);n.addEventListener("error",l,false);h.addEventListener("error",l,false);h.addEventListener("abort",l,false);n.addEventListener("abort",l,false);n.addEventListener("loadend",l,false);n.addEventListener("readystatechange",l,false);n.open("POST",g,true);n.send(f);}catch(k){}this.fire("uploadstart",{xhr:n});},cancelUpload:function(){this.get("xhr").abort();}},{NAME:"file",TYPE:"html5",ATTRS:{id:{writeOnce:"initOnly",value:null},size:{writeOnce:"initOnly",value:0},name:{writeOnce:"initOnly",value:null},dateCreated:{writeOnce:"initOnly",value:null},dateModified:{writeOnce:"initOnly",value:null},bytesUploaded:{readOnly:true,value:0},type:{writeOnce:"initOnly",value:null},file:{writeOnce:"initOnly",value:null},xhr:{readOnly:true,value:null},boundEventHandler:{readOnly:true,value:null}},isValidFile:function(f){return(b&&b.File&&f instanceof File);},canUpload:function(){return(b&&b.FormData&&b.XMLHttpRequest);}});e.FileHTML5=a;},"@VERSION@",{requires:["base"]});