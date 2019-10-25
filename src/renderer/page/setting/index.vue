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
      <div
        style="position:sticky;top:30px;background:#fff;padding-bottom:10px;z-index:10;color:#054792;box-shadow: 0 4px 15px -9px #ccc;"
      >
        <Divider orientation="left">
          &nbsp;&nbsp;
          <Icon type="logo-tux" />
          <span class="icon">服务器&nbsp;</span>
        </Divider>
        <i-switch size="large" v-model="setting.server_disable">
          <span slot="open">启用</span>
          <span slot="close">禁用</span>
        </i-switch>
      </div>
      <!-- :rules="ruleValidate" -->
      <div class="w">
        <transition-group tag="div" name="list">
          <div
            :class="` server ${setting.server_disable?'enable':''} `"
            v-for="(item,index) in setting.server"
            :key="`${item.id}`"
          >
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
              <FormItem label="角色" prop="role">
                <Input
                  v-model="item.role"
                  type="text"
                  style="width:300px;"
                  size="small"
                  placeholder="登录角色，例如 root "
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
import { getSetting, setSetting } from 'ROOT/database/db'
import {
  importSettingFile,
  exportSettingFile,
  alertMessage
} from '@/event/file'
import os from 'os'
export default {
  name: 'setting',
  data() {
    return {
      setting: {
        server_disable: null,
        server: []
      },
      ruleValidate: {
        path: [{ required: true, message: '必填项', trigger: 'blur' }],
        password: [{ required: true, message: '必填项', trigger: 'blur' }],
        ip: [{ required: true, message: '必填项', trigger: 'blur' }],
        role: [{ required: true, message: '角色必填', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let setting = getSetting('setting_server')
      //   if (!setting) {
      //     alertMessage('error', '配置信息读取失败！')
      //   } else {
      setting = {
        server: setting.server || [],
        server_disable: setting.server_disable || true
      }
      this.setting = setting
    },
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
        let { server, server_disable } = this.setting
        setSetting('setting_server', { server, server_disable })
        alertMessage('info', '保存成功')
        this.init()
      }
    },
    importFile() {
      // 第一个参数，作为main进程的模态框
      importSettingFile('导入文件')
    },
    exportFile() {
      exportSettingFile('导出配置')
    }
  }
}
</script>
<style  lang='less'>
.setting_body {
  width: 100%;
}
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
  padding: 0 30px 30px 30px;
  overflow: auto;
  .ivu-divider-horizontal.ivu-divider-with-text-left,
  .ivu-divider-horizontal {
    margin: 0;
  }
  .save {
    height: 30px;
    background: #fff;
    position: sticky;
    top: 0;
    z-index: 11;
    > .button {
      float: right;
      font-size: 13px;
      margin-right: 10px;
    }
  }
  .w {
    width: 700px;
    margin: 20px 100px;
  }
  .enable {
    border: 1px dashed #7cade0 !important;
  }
  .server {
    position: relative;
    padding: 10px;
    transition: all 0.3s;
    border: 1px dashed #dcdee2;
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