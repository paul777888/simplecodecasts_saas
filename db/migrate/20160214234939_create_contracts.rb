class CreateContracts < ActiveRecord::Migration
  def change
    create_table :contracts do |t|
      t.string:name
      t.string:email
      t.text:comments
      
      t.timestamps
    end
  end
end
