<template>
    <div>
        <el-button type="primary" @click="addUserDialog = true">确 定</el-button>

        <el-dialog title="添加用户" v-model="addUserDialog">
            <p>
                <el-select ref="daysSelect" v-model="year" placeholder="请选择">
                    <el-option
                        v-for="item in daysOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </p>

            <p>
                <el-select ref="days" v-model="days" placeholder="请选择">
                    <el-option
                        v-for="item in daysOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </p>

            <p>
                <el-select ref="hours" v-model="hours" placeholder="请选择">
                    <el-option
                        v-for="item in daysOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="userForm = false">取 消</el-button>
                <el-button type="primary" @click="test()">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>

    export default {
        data(){
            return {
                addUserDialog: false,
                days: '',
                year: '',
                hours: '',
                disabled: false,
                daysOptions: [
                    {
                        label: '1',
                        value: '1',
                    },
                    {
                        label: '2',
                        value: '2',
                    },
                    {
                        label: '3',
                        value: '3',
                    },
                    {
                        label: '4',
                        value: '4',
                    },
                    {
                        label: '5',
                        value: '5',
                    },
                    {
                        label: '6',
                        value: '6',
                    },
                    {
                        label: '7',
                        value: '7',
                    },
                    {
                        label: '8',
                        value: '8',
                    },
                    {
                        label: '9',
                        value: '9',
                    },
                    {
                        label: '10',
                        value: '10',
                    },
                    {
                        label: '11',
                        value: '11',
                    },
                    {
                        label: '12',
                        value: '12',
                    },
                    {
                        label: '13',
                        value: '13',
                    },
                    {
                        label: '14',
                        value: '14',
                    },
                    {
                        label: '15',
                        value: '15',
                    },
                ],
                userData: [
                    {
                        username: '',
                        realName: '',
                        isAdmin: false
                    }
                ],
            }
        },

        methods:{
            test(){
                console.log(`year: ${this.year}, days: ${this.days}, hours: ${this.hours}`);
            },
        }
    }

</script>

<style scoped>

</style>