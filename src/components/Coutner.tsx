import { useDispatch, useSelector } from 'react-redux'
import { increment } from '@/store/counter/counterSlice'
import type { RootState } from '@/store/store'

function Coutner() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      {count}
      <button onClick={() => dispatch(increment())}>+</button>
    </div>
  )
}

export default Coutner
