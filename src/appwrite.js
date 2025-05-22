import {Client, Databases,Query,ID} from "appwrite";


const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const USERS_ID = import.meta.env.VITE_APPWRITE_USERSCART_ID;
const USERCART_ID = import.meta.env.VITE_APPWRITE_USERCART_ID;
const USERSEARCHV_ID = import.meta.env.VITE_APPWRITE_USERSEARCH_ID;


const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);

const database = new Databases(client);

export const updateCartValue = async () => {

    console.log(DATABASE_ID);
    console.log(PROJECT_ID);
    console.log(USERS_ID);
    console.log(USERCART_ID);


}


export const updateSearchValue = async (searchValue, user) => {

    try {
        const result2= await database.listDocuments(DATABASE_ID,USERSEARCHV_ID,[
            Query.orderDesc('count'),
                 ])


        const result= await database.listDocuments(DATABASE_ID,USERSEARCHV_ID,[
            Query.equal('user',user),
            Query.equal('user_searchValue',searchValue),
        ])


        if(result.documents.length > 0){
            const doc = result.documents[0];


        }else{
            if(result2.documents.length > 10){
                const result3= await database.listDocuments(DATABASE_ID,USERSEARCHV_ID,[
                    Query.orderAsc('count'),
                ])
                console.log(  result3.documents[0]['$id']);
                //delete the oldest search
                await database.deleteDocument(
                    DATABASE_ID,
                    USERSEARCHV_ID,
                    result3.documents[0]['$id'],
                );
            }
            await database.createDocument(DATABASE_ID,USERSEARCHV_ID, ID.unique(),{
                user:user,
                user_searchValue:searchValue,
                search_date:new Date(),
                count:result2.documents.length > 0? result2.documents[0]['count']+1 : 1,
            })

        }

    } catch (err) {
        console.log(err);
    }

}

const newUserId = async () => {

    console.log(DATABASE_ID);
    console.log(PROJECT_ID);
    console.log(USERS_ID);
    console.log(USERCART_ID);

}


