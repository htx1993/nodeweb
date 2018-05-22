//创建操作说明
function createOperationInstructionsEl() {
    var html = '';
    try {
        html = '<div class="hnaui-panel hnaui-shadow hnaui-panel-describe">';
        html += '   <div class="hnaui-panel-title"><i class="hnaui-icon">&#xe641;</i>' + _i18n("CT02") + '</div>';
        html += '   <div class="hnaui-panel-content list-group">';
        html += '    <p class="list-group-item">';
        html += '    <strong>航段取消：</strong>在订单支付前，选中相关航段，即可对某航班的某些航段进行取消；';
        html += '   </p>';
        html += '   <p class="list-group-item">';
        html += '       <strong>在线支付：</strong>点击继续支付，进入网上银行支付页面，即可进行订单支付';
        html += '   </p>';
        html += '   <p class="list-group-item">';
        html += '       <strong>改期操作：</strong>两人（含）及以上购买往返和多航段的情况下，官网不支持部分旅客单独退改；多人航段订单里，若有1人（含）以上在官网操作过退票，官网不支持该订单其他客票进行改期。以上退款情况问题可联系呼叫中心{0}咨询处理'.format(_tel);
        html += '       详情请见：<u><a class="a-link" href="' + hna._server_host + '/airR/rules?type=passengerService#refundProcess" target="_blank">退票流程</a></u></strong>';
        html += '   </p>';
        html += '   <p class="list-group-item">需要注意：（1）请您先确认改期信息，在您点击“确认”后，我们将为您提供10分钟的时间供您完成改期支付，在此期间，您的改期信息将被保留且无法更改；（2）点击改期后，关闭该页面，则还可以在10分钟内查找该订单继续支付，但是无法购买辅营产品；（3）根据销售情况，航班价格会随时波动，生成的订单与查询价格可能存在不一致的情况，请以实际生成的订单价格为准。';
        html += '   </p>';
        html += '   <p class="list-group-item">';
        html += '       <strong>退票：</strong>当您选择退票时，您的座位将立刻释放，请您选择航段后再退票；只有状态为“未使用”的航段才可进行退票申请，若状态为“已挂起”，请您完成相关改期，在继续进行退票。退款金额以实际审核退款为准。“非自愿退票”如不符合条件按“自愿退票”处理，收取手续费。支付后，系统无法出票，若该订单无需在保障出票，请联系呼叫中心{0}进行退款。另，除北部湾航空有规定以外，客票的所有航段必须按照客票所列的航程，从始发地点开始顺序使用，如客票第一航段未使用，而旅客在约定的经停点开始旅行，该旅客运输无效，北部湾航空不予接受运输和退款。以上如有疑问，请呼叫{0}进行咨询。'.format(_tel);
        html += '       详情请见：<u><a class="a-link" href="' + hna._server_host + '/airR/rules?type=passengerService#refundNotes" target="_blank">退票须知</a></u>';
        html += '   </p>';
        // html += '   <p class="list-group-item">支付后系统无法出票，若该订单无需再保障出票，请联系呼叫中心{0}退款；</p>'.format(_tel);
        // html += '   <p class="list-group-item">除北部湾航空另有规定以外，客票的所有航段必须按照客票所列明的航程，从始发地点开始顺序使用。如客票第一航段未被使用，而旅客在约定的经停地点开始旅行，该旅客运输无效，北部湾航空不予接受运输及退款；</p>';
        html += '   <p class="list-group-item">';
        html += '       <strong>退款进度查询：</strong>如您的客票已通过审核，但是长时间未收到退款，请拨打客服电话95370咨询。';
        html += '   </p>';
        html += '   <p class="list-group-item">';
        html += '       <strong>病退说明：</strong>如旅客因病无法乘机，请在航班起飞前致电我司客服{0}取消座位，并将病退资料扫描件（身份证正反面复印件、县级（含）以上医疗单位出具的有主治医生签字的正规诊断证明、病例，医院打印的200元（含）以上医药费、治疗费等收费单），邮寄至gxa_wzkf@hnair.com，邮件内容请注明旅客的姓名、票号、身份证号及联系方式。详情请登录官网查询病退须知或拨打客服电话{0}咨询。'.format(_tel,_tel);
        html += '       详情请见：<u><a class="a-link" href="' + hna._server_host + '/airR/rules?type=passengerService#illnessNotes" target="_blank">病退须知</a></u>';
        html += '   </p>';
        html += ' </div>';
        html += '</div>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
//创建页面头部提示
function createPromptTop() {   //创建升舱规则
    var html = '';
    try {
        html = '<div class="hnaui-panel hnaui-shadow">';
        html += '       <div class="hnaui-panel-title"><i class="hnaui-icon">&#xe641;</i>操作说明 </div>';
        html += '       <div class="hnaui-panel-content list-group">';
        html += '           <p class="list-group-item"><strong>1、退改操作：</strong>  两人（含）及以上购买往返和多航段的情况下，官网系统不支持非全部人退改；多人单航段订单，官网系统不支持非全部人改期；携带婴儿旅客，官网系统不支持婴儿单独退票；多人订单里，若有一人（含）以上在官网操作过退票，官网系统不支持该订单其他客票改期；北部湾航空官网暂不支持国际客票改期服务。以上情况涉及退款相关问题请联系首页在线客服，其他情况联系{0}处理，改期升舱需要在呼叫中心支付产品差价；</p>'.format(_tel);
        html += '           <p class="list-group-item"><strong>2、请您务必在改期后：</strong>  自行对原订单购买的辅营产品联系呼叫中心进行退订、变更或申请退款；</p>';
        html += '           <p class="list-group-item"><strong>3、您还可以在客票改期后</strong>  通过订单管理重新购买您所需要的辅营产品。</p>';
        html += '       </div>';
        html += '   </div>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
//创建升舱提示
function createPromptBottom() {
    var html = '';
    try {
        html = '<div class="hnaui-panel hnaui-shadow">';
        html += '       <div class="hnaui-panel-title"><i class="hnaui-icon">&#xe641;</i>旅客须知</div>';
        html += '       <div class="hanui-panel-content list-group">';
        html += '           <p class="list-group-item">航班改期每次最多只能更改两个航班，且一同更改的旅客原航段信息必须完全相同。</p>';
        html += '           <p class="list-group-item">若购票时儿童随成人同行，成人改期后，儿童一定要随成人作更改；若更改后，成人和儿童的航段信息不一致，导致不能同行，责任自负。</p>';
        html += '       </div>';
        html += '   </div>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
//退票说明
function refundDescription() {
    var html = '';
    try {
        html = '<div>';
        html += '   <ul class="refund-step-info" >';
        html += '       <li>请选择需要退票的客航段，以及退票原因，点击<span>“下一步”</span>，核对退票费用。</li>';
        html += '       <li><span>增值产品说明：</span>航班正常情况下，预订的餐饮服务不允许取消及退款，若航空公司原因导致航班不正常的情况，则可申请退还已支付费用；预购行李费不允许单独退款，只能随机票一起退订。上述增值服务退还的费用将在7至15个工作日内原路退回旅客所支付的账户中。</li>';
        html += '   </ul>';
        html += '   <div class="refund-info hna-voluntary-refund">自愿退票：将收取相应的舱位及折扣的退票费，如果是变更后的客票退票，变更费、票款差额不退，按照变更后的舱位及取消座位时间收取相应的退票费。</div>';
        html += '</div>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
//创建非自愿退票原因模块
function createInvoluntaryRefundEl() {
    var html = '';
    try {
        html = '';
        html += '<div class="hnaui-panel hnaui-shadow hna-involuntary-refund">';
        html += '   <div class="hnaui-panel-title"> <i class="hnaui-icon">&#xe90c;</i>退票原因 </div>';
        html += '   <div class="hnaui-panel-content list-group">';
        html += '       <ul class="refund-step-info">';
        html += '           <li>为了您的退票申请得到及时、正确的处理，请您确保符合以下非自愿退票申请情况，根据实际情况填入非自愿退票申请原因，工作人员将根据填写原因审理退票。</li>';
        html += '           <li>1、病退旅客，请提供包含诊断证明、病例、200元（含）以上医药费收费单，详细要求请见<u><a href="'+ hna._server_host +'/airR/rules?type=passengerService#illnessNotes" target="_blank" class="a-link">【广西北部湾航空病退须知】</a></u></li>';
        html += '           <li>2、航班不正常（延误、取消、超售）旅客，请联系航司开具不正常航班证明；请将以上材料发送至<u style="color: red;">gxa_wzkf@hnair.com</u>北部湾票务服务邮箱，我司收到材料后<span style="color: red;">15个工作日内</span>完成审核及退款。</li>';
        // html += '           <li>3、如因航班超售，请在下框中填入“航班超售”。</li>';
        // html += '           <li>4、如旅客因病无法乘机，请在航班起飞前致电我司客服95370取消座位，并将病退资料扫描件（身份证正反面复印件、县级(含)以上医疗单位出具的有主治医生签字的正规诊断证明、病历、医院电脑打印的200元(含)以上医药费、治疗费等收费单），邮寄至gxa_wzkf@hnair.com，邮件内容请注明旅客的姓名、票号、身份证号及联系方式。请在下框中填入“申请病退，病退材料已邮寄，快递单号XXXXXXX”。详情请登录官网查询<a href="'+ hna._server_host +'/airR/rules?type=passengerService#illnessNotes" target="_blank" class="a-link">病退须知</a>或拨打客服电话95370咨询。</li>';
        // html += '           <li>5、若您不符合上述条件，请拨打95370或访问北部湾航空在线客服寻求帮助。</li>';
        html += '       </ul>';
        html += '       <textarea name="remark" id="remark" style="width: 100%;height: 100px" maxlength="120"></textarea>';
        html += '       <div class="refund-info"> 非自愿退票：如航班取消、航班延误、病退等情况，并在备注里写明原因。</div>';
        html += '   </div>';
        html += '</div>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
//退票提示
function refundTips() {
    var html = '';
    try {
        html += '       <div>';
        html += '           <p>退票操作相关说明：</p>';
        html += '           <p>1.如由于您自身原因造成退票，请选择“自愿退票”，将按照相应规定扣除手续费；</p>';
        html += '           <p>2.如由于航班取消、航班延误、机场拒载、航班超售、旅客患病等原因无法乘机，请选择“非自愿退票”并备注原因，符合条件的将免收手续费；</p>';
        html += '           <p>3.退款金额以实际审核退款为准。“非自愿退票”如不符合条件将按照“自愿退票”处理，收取手续费。</p>';
        html += '           <p>4.您还可以点击如下链接地址详细了解北部湾航空相关规则：<a href="' + hna._server_host + '/airR/rules?type=passengerService#refundNotes" target="_blank" class="a-link">退票须知</a>，<a href="' + hna._server_host + '/airR/rules?type=passengerService#refundProcess" target="_blank" class="a-link">退票流程及到账时间</a>，<a href="' + hna._server_host + '/airR/rules?type=passengerService#illnessNotes" target="_blank" class="a-link">病退须知</a>。</p>';
        html += '       </div>';
    } catch (e) {
        JsErrorTips(e);
        html = '';
    }
    return html;
}
