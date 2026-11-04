'use strict';
// Giá mặc định chỉ là ví dụ, người dùng có thể sửa.
const defaultPrices = {hiflex:25000,pp:65000,decal:75000,custom:0};
const ids=['unitPrice','width','height','quantity','waste','finishing','extra','markup'];
const $=id=>document.getElementById(id);
const money=n=>new Intl.NumberFormat('vi-VN',{style:'currency',currency:'VND',maximumFractionDigits:0}).format(n);
const number=n=>new Intl.NumberFormat('vi-VN',{maximumFractionDigits:3}).format(n);
let lastQuote='';
function calculate(){
  const values=Object.fromEntries(ids.map(id=>[id,Number($(id).value)]));
  const {unitPrice,width,height,quantity,waste,finishing,extra,markup}=values;
  const valid=ids.every(id=>$(id).value.trim()!==''&&Number.isFinite(values[id]))&&width>0&&height>0&&Number.isInteger(quantity)&&quantity>=1&&unitPrice>=0&&waste>=0&&waste<=100&&finishing>=0&&extra>=0&&markup>=0;
  $('error').hidden=valid;
  $('error').textContent=valid?'':'Kiểm tra dữ liệu: kích thước phải lớn hơn 0, số tấm là số nguyên từ 1, hao hụt từ 0–100%, các khoản tiền và lợi nhuận không âm.';
  if(!valid){for(const id of ['area','totalArea','cost','profit','total','perPiece'])$(id).textContent='—';lastQuote='';return;}
  const area=width*height/10000;
  const totalArea=area*quantity;
  // Hao hụt áp dụng cho chi phí vật tư/in, không cộng thêm diện tích giao khách.
  const materialCost=totalArea*unitPrice*(1+waste/100);
  const cost=materialCost+finishing*quantity+extra;
  const profit=cost*markup/100;
  const total=cost+profit;
  $('area').textContent=number(area)+' m²';$('totalArea').textContent=number(totalArea)+' m²';$('cost').textContent=money(cost);$('profit').textContent=money(profit);$('total').textContent=money(total);$('perPiece').textContent=money(total/quantity);
  lastQuote=`BÁO GIÁ IN ẤN\nVật tư: ${$('material').selectedOptions[0].text}\nKích thước: ${number(width)} × ${number(height)} cm\nSố lượng: ${quantity} tấm\nTổng diện tích: ${number(totalArea)} m²\nGiá vốn: ${money(cost)}\nGiá báo khách: ${money(total)}\nĐơn giá/tấm: ${money(total/quantity)}`;
}
$('material').addEventListener('change',()=>{$('unitPrice').value=defaultPrices[$('material').value];calculate()});
ids.forEach(id=>$(id).addEventListener('input',calculate));
$('reset').addEventListener('click',()=>{const initial={width:100,height:200,quantity:1,waste:5,finishing:0,extra:0,markup:30};$('material').value='hiflex';$('unitPrice').value=defaultPrices.hiflex;Object.entries(initial).forEach(([id,v])=>$(id).value=v);$('copyStatus').textContent='';calculate()});
$('copy').addEventListener('click',async()=>{if(!lastQuote)return;try{await navigator.clipboard.writeText(lastQuote);$('copyStatus').textContent='Đã sao chép báo giá.'}catch{$('copyStatus').textContent='Trình duyệt không cho sao chép tự động. Hãy mở bằng HTTPS (GitHub Pages) rồi thử lại.'}});
calculate();
