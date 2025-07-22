
const fetchUserData = () => {
    return new Promise((resolve , reject) => {
        setTimeout(() => {
            resolve({name: "Ashen" , url: "https://ashenmaneth.xyz"})
        },3000);
    })
}

async function getUserData(){
    try {
        console.log('Fetching User Data...');
        const userData = await fetchUserData();
        console.log('User Data: ',userData);
        console.log('User Data Fetched Successfully');  
        
    } catch (error) {
        console.log('Error fetching user data:', error);
    }
}

getUserData();



console.log("Part 2");




function fetchPostData() {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve("Post Data Fetched Successfully")
        },2000);
    })
}


const fetchCommentData = () => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve("Comment Data Fetched Successfully");
        },3000);
    });
}



async function getBlogData(){
    try {
        console.log("Fetching Blog Data...");
        const postData = await fetchPostData();
        console.log(postData);
        
        
        const commentData = await fetchCommentData();
        console.log(commentData);

//                                       we can use bellw code also instead of above code

/*         const [post , comment] = await Promise.all([
            fetchPostData(), fetchCommentData()
        ]);
        console.log(post);
        console.log(comment); */

        console.log("Blog Data Fetched Completely");
        

    }catch (error) {
        console.log("Error fetching blog data:",error);
        
    }
}

getBlogData();
