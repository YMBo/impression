<template>
  <div class="bg">
    <div class="save">
      <Button class="button" type="warning" size="small" @click="exportFile">导出配置</Button>
      <Button
        class="button"
        style="background:#8d70ff;border-color:#8d70ff"
        type="warning"
        size="small"
        @click="importFile"
      >导入配置</Button>
      <Button class="button" type="primary" size="small" @click="save">保存</Button>
    </div>
    <div class="setting_body">
      <Divider
        style="position:sticky;top:30px;background:#fff;z-index:10;color:#054792;box-shadow: 0 4px 15px -9px #ccc;"
        orientation="left"
      >
        <Icon type="logo-tux" />
        <span class="icon">服务器&nbsp;</span>
      </Divider>
      <!-- :rules="ruleValidate" -->
      <div class="w">
        <transition-group tag="div" name="list">
          <div class="server" v-for="(item,index) in setting.server" :key="item.id" pose="visible">
            <Form
              :ref="'form'+index"
              style="margin:20px 40px 0;font-size:12px;width: 600px;"
              :model="item"
              :rules="ruleValidate"
              :label-width="150"
            >
              <FormItem label="服务器存储路径" prop="path">
                <Input
                  type="text"
                  v-model="item.path"
                  style="width:300px;"
                  size="small"
                  placeholder="/home/a/b/c"
                />
              </FormItem>
              <FormItem label="服务器IP" prop="ip">
                <Input
                  type="text"
                  v-model="item.ip"
                  style="width:300px;"
                  size="small"
                  placeholder="服务器公网IP"
                />
              </FormItem>
              <FormItem label="服务器密码" prop="password">
                <Input
                  password
                  v-model="item.password"
                  type="password"
                  style="width:300px;"
                  size="small"
                  placeholder="服务器密码"
                />
              </FormItem>
              <FormItem label="备注">
                <Input
                  password
                  v-model="item.comment"
                  type="textarea"
                  style="width:300px;"
                  size="small"
                />
              </FormItem>
              <transition name="fade">
                <Button
                  v-if="setting.server.length!=1"
                  class="delete_button"
                  type="error"
                  ghost
                  @click="remove(index)"
                >删除</Button>
              </transition>
            </Form>
          </div>
        </transition-group>
        <div style="width:60%;margin:10px auto;">
          <Button type="dashed" long @click="handleAdd" icon="md-add">添加服务器</Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import db from 'ROOT/database/datastore'
import { remote } from 'electron'
import os from 'os'
export default {
  name: 'setting',
  data() {
    return {
      setting: {
        server: [
          { id: Math.random(), path: '', ip: '', password: '', comment: '' }
        ]
      },
      ruleValidate: {
        path: [{ required: true, message: '必填项', trigger: 'blur' }],
        password: [{ required: true, message: '必填项', trigger: 'blur' }],
        ip: [{ required: true, message: '必填项', trigger: 'blur' }]
      }
    }
  },
  methods: {
    remove(i) {
      if (this.setting.server.length == 1) {
        return
      }
      this.setting.server.splice(i, 1)
    },
    handleAdd() {
      this.setting.server.push({
        id: Math.random(),
        path: '',
        ip: '',
        password: '',
        comment: ''
      })
    },
    save() {
      let i = this.setting.server.length
      let flag = true
      for (let m = 0; m < i; m++) {
        let name = 'form' + m
        this.$refs[name][0].validate(valid => {
          if (!valid) {
            flag = false
          }
        })
      }
      if (flag) {
        db.set('setting_server', this.setting.server).write()
      }
    },
    importFile() {
      // 第一个参数，作为main进程的模态框
      remote.dialog.showOpenDialog(remote.BrowserWindow, {
        title: '配置文件导入',
        properties: ['openFile'],
        filters: [{ name: 'JSON', extensions: ['json'] }]
      })
    },
    exportFile() {}
  }
}
</script>
<style  lang='less'>
// .setting_body {
//   .ivu-divider-horizontal.ivu-divider-with-text-left:before,
//   .ivu-divider-horizontal.ivu-divider-with-text-left:after {
//     border-color: #054792;
//   }
// }
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}
.list-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
<style scoped lang='less'>
.bg {
  height: 100%;
  padding: 30px;
  overflow: auto;
  .save {
    position: absolute;
    left: 20px;
    right: 20px;
    z-index: 10;
    height: 30px;
    top: 0;
    background: #fff;
    > .button {
      float: right;
      font-size: 13px;
      margin-right: 10px;
    }
  }
  .w {
    width: 700px;
  }
  .server {
    position: relative;
    padding: 10px;
    border: 1px dashed #ccc;
    margin-bottom: 10px;
    .delete_button {
      position: absolute;
      right: 0;
      top: 0;
      border-radius: 0;
      height: 100%;
      background: #f5f5f5;
      border: 0;
      &:hover {
        color: #fff;
        background: #dc5e5e;
      }
    }
  }
}
.icon {
  font-size: 14px;
}
</style>