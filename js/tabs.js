
(function(){
    document.querySelectorAll('[data-tab-target]').forEach(item=>{
        item.addEventListener('click', function(e){
            e.preventDefault();
            e.stopPropagation();
            const target = e.target.dataset.tabTarget;
            const container = e.target.dataset.tabGroup;

            document.querySelectorAll(`[data-tabs="${container}"] .tab-content`).forEach(item=>{
                item.classList.remove('active');
            });

            document.querySelectorAll(`[data-tabs="${container}"] .tabs-item`).forEach(item=>{
                item.classList.remove('active');
            });

            document.querySelector(`[data-tab-content="${target}"]`).classList.add('active');
            e.target.classList.add('active');
        });
    });
})();