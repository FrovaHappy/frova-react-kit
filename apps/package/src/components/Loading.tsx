import style from '@styles/Loading.module.scss'
function Loading() {
  return (
    <div className={style.content}>
      <div className={style.loader} />
    </div>
  )
}

export default Loading
