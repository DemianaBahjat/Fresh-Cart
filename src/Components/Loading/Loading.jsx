import React from 'react'
import { SyncLoader} from 'react-spinners'

export default function Loading() {
  return (
    <>
    <div className="vh-100 py-5 d-flex justify-content-center align-items-center">
    <SyncLoader color="#36d7b7"   size={25} />
    {/* loading.... */}
    </div>
    
    
    </>
  )
}
