import {Client, Databases, Query, ID} from "appwrite";
import {components as gameCardInfo} from "daisyui/imports.js";


const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const USERS_ID = import.meta.env.VITE_APPWRITE_USERS_ID;
const USERCART_ID = import.meta.env.VITE_APPWRITE_USERCART_ID;
const USERSEARCHV_ID = import.meta.env.VITE_APPWRITE_USERSEARCH_ID;


const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);

const database = new Databases(client);

export const updateCartValue = async (data) => {
    const isEmpty = Object.keys(data).length === 0;

    if (!isEmpty) {
        console.log("shoor");
        console.log(data.gameId);
        if (data.gameId) {
            console.log("shoor2");
            console.log(USERCART_ID);
            const userData =
                await database.listDocuments(DATABASE_ID, USERCART_ID, [
                Query.equal('game_id', data.gameId)
            ])
            console.log("shoor3");
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


export const updateSearchValue = async (searchValue, user) => {

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

export const newUserId = async (user) => {
    if (user !== null || user !== "") {
        try {
            const userData = await database.listDocuments(DATABASE_ID, USERS_ID, [
                Query.equal('users', user),
            ])

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

export const validateGame = async (game_id) => {



}
