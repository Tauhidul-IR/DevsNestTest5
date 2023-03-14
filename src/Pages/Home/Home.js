import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import UpdateUserModal from './UpdateUserModal';

const Home = () => {

    const [userInfo, setUserInfo] = useState(null)
    //GET all Data-------------------------show all data

    const { data: allData = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('https://test5-api-server.vercel.app/users');
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <h4>Loading..................</h4>
    }

    //Data Insert to API
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const userName = form.userName.value;
        const email = form.email.value;
        console.log(name, email, userName)


        const insertAbleData = {
            name,
            userName,
            email

        }

        console.log(insertAbleData);

        fetch('https://test5-api-server.vercel.app/usersData', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(insertAbleData)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                if (result.acknowledged) {
                    toast.success(`Post added successfully`);
                    form.reset()
                    refetch()
                }
            })
    }

    const updateAbleData = (data) => {
        console.log(data);
        setUserInfo(data)
    }
    console.log(userInfo);


    return (
        <div className='container mx-auto'>

            {/* Show data */}
            <div>
                <h1 className='text-4xl font-bold'>Show Data</h1>
                <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10'>
                    {
                        allData.map(data => <div key={data?._id} className="card w-96 bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">{data?.name}</h2>
                                <p>{data?.username}</p>
                                <p>{data?.email}</p>
                                <div className="card-actions justify-end">
                                    {/* The button to open modal */}
                                    <label onClick={() => updateAbleData(data)} htmlFor="editAbout-modal" className="btn">Update</label>
                                </div>
                            </div>
                        </div>)
                    }
                    {
                        userInfo && <UpdateUserModal setUserInfo={setUserInfo} userInfo={userInfo} refetch></UpdateUserModal>
                    }
                </div>
            </div>

            {/* Insert a data */}
            <div>
                <h4 className='text-4xl font-bold'>Insert a user data</h4>
                <form onSubmit={handleSubmit} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name='name' placeholder="Name" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">User Name</span>
                        </label>
                        <input type="text" name='userName' placeholder="User Name" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name='email' placeholder="email" className="input input-bordered" />
                    </div>

                    <div className="form-control mt-6">
                        <input className="btn btn-primary" type="submit" value="Insert" />
                    </div>
                </form>
            </div>

            {/* Update a Data */}
            <div>

            </div>
        </div>
    );
};

export default Home;