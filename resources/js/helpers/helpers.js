export const setChildrenComment = (comment, comments) => {
    let children = [];
    let result = {
        comment: {},
        children: {}
    };
    comments.forEach(el => {
        if(el.parent_id !== comment.id){
            return;
        }
        children.push(el);
    });
    result.comment = comment;
    children.forEach(lol => {
        let hasChildren = false;
        comments.forEach(com => {
            if(lol.id === com.parent_id){
                result.children[lol.id] = setChildrenComment(lol, comments);
                hasChildren = true;
            }
        });
        if(!hasChildren){
            result.children[lol.id] = {comment:lol, children: {}}
        }
    });

    return result;
};

export const setCommentsArray = (comments) =>{
    let arrCom = [];
    comments.map(comment => {
        if(!comment.parent_id) {
            arrCom.push(setChildrenComment(comment, comments));
        }
    });
    return arrCom;
};