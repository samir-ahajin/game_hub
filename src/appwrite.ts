import {Client, Databases, Query, ID} from "appwrite";


const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const USERS_ID = import.meta.env.VITE_APPWRITE_USERS_ID;
const USERCART_ID = import.meta.env.VITE_APPWRITE_USERCART_ID;
const USERSEARCHV_ID = import.meta.env.VITE_APPWRITE_USERSEARCH_ID;


const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);

const database = new Databases(client);

export const updateCartValue = async (data:any) => {
    try{
        const isEmpty = Object.keys(data).length === 0;

        if (!isEmpty) {
            if (data.gameId) {
                const userData =
                    await database.listDocuments(DATABASE_ID, USERCART_ID, [
                        Query.equal('game_id', data.gameId),
                        Query.equal('user', data.user)
                    ])

                await newUserId(data.user);

                if (userData.documents.length === 0) {

                    await database.createDocument(DATABASE_ID, USERCART_ID, ID.unique(), {
                        user: data.user,
                        game_id: data.gameId,
                        game_name: data.gameCardInfo.name,
                        game_url: data.gameUrl,
                        game_rating: data.gameCardInfo.rating,
                        game_description: data.gameCardInfo.description,
                        game_image_url: data.gameCardInfo.background_image,
                        added_date: new Date(),
                    })

                }
            }
        }

    }
    catch (e) {
        console.error(e);
    }

}


export const updateSearchValue = async (searchValue:string, user:string) => {

    try {
        const result2 = await database.listDocuments(DATABASE_ID, USERSEARCHV_ID, [
            Query.orderDesc('count'),
        ])


        const result = await database.listDocuments(DATABASE_ID, USERSEARCHV_ID, [
            Query.equal('user', user),
            Query.equal('user_searchValue', searchValue),
        ])
        await newUserId(user);

        if (result.documents.length > 0) {
            const doc = result.documents[0];
            console.log(doc)

        } else {
            if (result2.documents.length > 10) {
                const result3 = await database.listDocuments(DATABASE_ID, USERSEARCHV_ID, [
                    Query.orderAsc('count'),
                ])
                // console.log(  result3.documents[0]['$id']);
                //delete the oldest search
                await database.deleteDocument(
                    DATABASE_ID,
                    USERSEARCHV_ID,
                    result3.documents[0]['$id'],
                );
            }
            await database.createDocument(DATABASE_ID, USERSEARCHV_ID, ID.unique(), {
                user: user,
                user_searchValue: searchValue,
                search_date: new Date(),
                count: result2.documents.length > 0 ? result2.documents[0]['count'] + 1 : 1,
            })

        }

    } catch (err) {
        alert(err);
    }

}

export const newUserId = async (user:string) => {
    if (user !== null || user !== "") {
        try {
            const userData = await database.listDocuments(DATABASE_ID, USERS_ID, [
                Query.equal('users', user),
            ])

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if (!userData.documents.length > 0) {
                const lastUserCount = await database.listDocuments(DATABASE_ID, USERS_ID, [
                    Query.orderDesc('count'),
                ])
                await database.createDocument(DATABASE_ID, USERS_ID, ID.unique(), {
                    users: user,
                    added_date: new Date(),
                    count: lastUserCount.documents.length > 0 ? lastUserCount.documents[0]['count'] + 1 : 1,
                })

            }

        } catch (err) {
            alert(err);
        }
    }
}

export const validateGame = async (user:string,) => {


    const userData =
        await database.listDocuments(DATABASE_ID, USERCART_ID, [
            Query.equal('user', user)
        ])
    console.log(userData)

}

export const getUserGameList = async (user:string) => {

    try{
        const userData = await database.listDocuments(DATABASE_ID,USERCART_ID, [
            Query.equal('user', user),
        ])

         console.log(userData)
        return userData;
    }
    catch (err){
        console.log(err);
    }
}

export const removeId = async (user:string,id:string) => {

    try{
        const userData = await database.listDocuments(DATABASE_ID,USERCART_ID, [
            Query.equal('user', user),
            Query.equal('$id', id),
        ])

        if(userData.documents.length > 0) {
            const document_id = userData.documents[0]['$id'];
            console.log(document_id);

            await database.deleteDocument(
                DATABASE_ID,USERCART_ID,document_id
            )
        }

         console.log(userData)

    }
    catch(err){
        console.log(err);
    }
}