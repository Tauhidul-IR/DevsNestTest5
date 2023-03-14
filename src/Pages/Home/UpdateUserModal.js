import React from 'react';
import { toast } from 'react-hot-toast';

const UpdateUserModal = ({ setUserInfo, userInfo, refetch }) => {
    console.log(userInfo._id);

    const handleUpdateInfo = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const userName = form.userName.value;
        const email = form.email.value;

        const upadatedInfo = {
            name,
            userName,
            email

        }

        fetch(`https://test5-api-server.vercel.app/usersData/${userInfo?._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(upadatedInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    toast.success('Data Updated')
                    setUserInfo(null)
                    console.log(data);
                    refetch()
                }
            })
    }


    return (
        <div>
            <input type="checkbox" id="editAbout-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="editAbout-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h2>Edit Your Info</h2>
                    <form onSubmit={handleUpdateInfo} className='grid grid-cols-1 gap-3 mt-10'>

                        <label>Name</label>
                        <input name='name' type="text" placeholder="Your Name" className="input input-bordered w-full" />
                        <label>User Name</label>
                        <input name='userName' type="text" placeholder="User Name" className="input input-bordered w-full" />
                        <label>Email</label>
                        <input name='email' type="email" placeholder={userInfo?.email} disabled className="input input-bordered text-black w-full" />

                        <br />
                        <input className='w-full  btn btn-primary' type="submit" value="Save" />

                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateUserModal;