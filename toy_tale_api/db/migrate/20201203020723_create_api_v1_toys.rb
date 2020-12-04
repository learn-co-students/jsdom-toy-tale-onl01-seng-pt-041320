class CreateApiV1Toys < ActiveRecord::Migration[6.0]
  def change
    create_table :api_v1_toys do |t|
      t.string :name
      t.string :image
      t.integer :likes

      t.timestamps
    end
  end
end
