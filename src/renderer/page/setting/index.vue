<template>
  <div class="bg">
    <Divider orientation="left">
      <Icon type="logo-tux" />
      <span class="icon">服务器&nbsp;</span>
    </Divider>
    <Form
      ref="formInline"
      style="width:300px;margin:20px 40px 0;font-size:12px;"
      :rules="ruleValidate"
      abel-position="top"
    >
      <FormItem label="服务器存储路径" prop="path">
        <Input type="text" placeholder="目标服务器的存储目录" />
      </FormItem>
      <FormItem prop="password">
        <Input type="password" placeholder="Password"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary">Signin</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import db from 'ROOT/database/datastore'
export default {
  name: 'setting',
  data() {
    return {
      ruleValidate: {
        path: [{ required: true, message: '必填项', trigger: 'blur' }]
      }
    }
  }
}
</script>
<style scoped>
.bg {
  height: 100%;
  padding: 10px;
}
.icon {
  font-size: 14px;
}
</style>