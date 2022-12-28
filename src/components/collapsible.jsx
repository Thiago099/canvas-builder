import './collapsible.css'
export default function Collapsible({title}, children) {
    const ref = {}
    const data = effect({hidden:false})

    var content = 
    <div class="collapsible">
        <div class="collapsible-header" draggable id="header" ref={ref}><i id="icon" ref={ref} class="fa-sharp fa-solid"></i><div class="collapsible-title">{title}</div></div>
        <div class="collapsible-content" id="content" ref={ref}>{children}</div>
    </div>

    content
        .effect(data)

    ref.header.event("click",e=>{
        data.hidden = !data.hidden
    })
    ref.icon
    .class(()=>data.hidden?'fa-caret-down':'fa-caret-up')

    ref.content
    .class("collapsible-hidden",()=>data.hidden)

    return content
}