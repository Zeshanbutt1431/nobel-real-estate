import spinner from '../assets/svg/spinner.svg';
export default function Spinner() {
    return (
        <div className='flex justify-center items-center h-[100vh] bg-black bg-opacity-50 z-50'>
            <div>
                <img src={spinner} alt="Loading..." className='h-24' />
            </div>
        </div>
    )
}
