const names=document.querySelector("#name");
const license=document.querySelector("#license");
const codeEmployee=document.querySelector("#codeEmployee");
const email=document.querySelector("#email");
const vazn=document.querySelector("#vazn");
const model=document.querySelector("#model");
const noeBar=document.querySelector("#noeBar");
const phone=document.querySelector("#phone");
// 
const mail=document.getElementById("mail");
const src=document.querySelector("#src");
const des=document.querySelector("#des");


function register(e){
    let valn=names.value;
    let vall=license.value;
    let valc=codeEmployee.value;
    let emails=email.value;
    let vazns=vazn.value;
    let models=model.value;
    let srcs=src.value;
    let dess=des.value;
    let noeBars=noeBar.value;
    let phones=phone.value;

    if(valn && vall && valc && emails && vazns && models && srcs && phones && dess && noeBars !=''){
        
        
        const data = {
          fullName:valn,
          license:vall,
          codeEmployee:valc,         
          vazn:vazns,         
          model:models,   
          email:emails,      
          src:srcs,         
          des:dess,         
          noeBar:noeBars,
          phone:phones         
                
        };
        fetch("https://66caec954290b1c4f1990ef1.mockapi.io/register", {
            method: 'POST',
            headers: {'content-type':'application/json'},
            body:JSON.stringify(data)
          }).then(res => {
            if (res.ok) {
                return res.json();
            }
            
          }).then(tasks => {
            swal({
                text: ' ورود اطلاعات  با موفقیت انجام شد ',
                buttons:false,
                icon:'success'
              });
              setTimeout(() => {
                  location.href='login.html'
              }, 1000);
          }).catch(error => {
            swal({
              text: "فرم صحیح پر کنید",
              
              buttons:false,
              icon:'error'
            });
          });
          valc='';
          valn='';
          vall='';
          vazn .value=     '';    
          model.value= '';
          email.value=    '';
          src.value = '';
          des.value = '';
          noeBars.value='';
          phone.value=  '';
    }else{
        swal({
            text: "فرم کامل پر کنید",
            buttons:false,
            icon:'error'
          });
    }
}
// admin 
function login(e){
  
  let mails=mail.value;
 
  if(mails !=''){
      const url = new URL('https://66caec954290b1c4f1990ef1.mockapi.io/register');

      url.searchParams.append('email',mails);

      fetch(url, {
          method: 'GET',
          headers: {'content-type':'application/json'},
        }).then(res => {
          if (res.ok) {
              return res.json();
          }
          
        }).then(tasks => {
            tasks.map((i,val)=>{
                
               if(i.email){  
                
                let st1=i.src;                      
                let st2=i.des;                      
                let st3=i.vazn;                      
                   swal({
                       text: 'ایمیل شما درست وارد شده  ',
                       buttons:false,
                       icon:'success'
                   });
                 
               localStorage.setItem("src",st1)  
               localStorage.setItem("des",st2)  
               localStorage.setItem("vazn",st3)  
               location.href="map.html"                   
               }
               
            })


          
        }).catch(error => {
          swal({
              text: 'ایمیل خود را صحیح وارد کنید ',
              buttons:false,
              icon:'error'
          });
        });
      mails='';
       
  }else{
      swal({
          text: "فرم کامل پر کنید",
          buttons:false,
          icon:'error'
        });
  }
}
// login

function admin(){
  location.href="authAdmin.html"
}
function user(){
  location.href="login.html"
}
function authAdmin(){
  let email = document.getElementById('mail1').value;
  if(email!=''){
     const url = new URL('https://66caec954290b1c4f1990ef1.mockapi.io/register');
      url.searchParams.append('email',email);
     fetch(url,{method: 'GET',
          headers: {'content-type':'application/json'},
        }).then(res => {
          if (res.ok) {
              return res.json();
          }
          
        }).then(tasks => {
            tasks.map((i,val)=>{
                
               if(i.email=="root@gmail.com"){  
                                          
                   swal({
                       text: 'ایمیل شما درست وارد شده  ',
                       buttons:false,
                       icon:'success'
                   });
                 
               
               location.href="admin.html"                   
               }
               
            })


          
        }).catch(error => {
          swal({
              text: 'ایمیل خود را صحیح وارد کنید ',
              buttons:false,
              icon:'error'
          });
        }); 
  }else{
     swal({
          text: " ایمیل را وارد کنید",
          buttons:false,
          icon:'error'
        });
  }
  
}