//API 응답을 커스터마이징 해서 받을 수 있음!
import { RestSerializer } from "miragejs"

const userSerializer = RestSerializer.extend({
  include: ["posts"], // 관계된 'posts' 데이터를 자동으로 포함
  exclude: ["password"] // 'password' 필드를 응답에서 제외
})

export default userSerializer
