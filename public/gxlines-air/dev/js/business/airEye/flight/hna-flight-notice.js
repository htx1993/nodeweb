//创建注意事项面板
function createAttentionPanel() {
    var html = '<div class="p-panel hnaui-panel hnaui-shadow hnaui-flight-attention flight-attention-panel">';
    html += '       <div class="hnaui-panel-title"><i class="hnaui-icon">&#xe91d;</i>' + _i18n("F35") + '</div>';
    html += '       <div class="hnaui-panel-content">';
    html += '           <p>1、病患旅客、残疾人旅客、担架旅客、额外占座旅客、机要交通员、醉酒旅客、老年旅客、轮椅旅客、无陪儿童、孕妇旅客等特殊旅客需致电北部湾航空呼叫中心{0}或乌航直属售票处、合办售票处、机场柜台办理购票业务，网站不提供特殊旅客的购票业务。详情请阅读'.format(_tel) +
        ' <a class="a-link" href="' + hna._server_host + '/airR/rules?type=customService#specialPassenger" target="_blank">《特殊旅客说明》</a> ，致电{0}、访问北部湾航空微信公众号寻求人工客服帮助。</p>'.format(_tel);
    html += '           <p>2、特惠、天地同行、爱乌及五等客票产品不允许自愿改签；自愿退票仅退还民航发展基金及燃油附加费。</p>';
    html += '       </div>';
    html += '   </div>';
    $(".flight-attention-panel").replaceWith(html);
}